import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Card, Column, Comment } from '../models/board.model';
import {
    CardsResponse,
    ColumnsResponse,
    CommentsResponse,
} from '../models/response.model';
import { ServiceColumn } from '../models/service-board.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    private board: ServiceColumn[] = [];
    private board$ = new BehaviorSubject<any>(false);

    columns!: Column[];
    cards: Card[] = [];
    comments: Comment[] = [];

    private colors = [
        '#009886',
        '#e92c64',
        '#a63eb9',
        '#2c4ac9',
        '#208eed',
        '#ff772a',
        '#7b1717',
        '#4a5e86',
        '#86724a',
        '#945c92',
    ];
    private colorIndex = 0;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.loadBoard();
    }

    loadBoard() {
        forkJoin([
            this.http.get('http://localhost:8080/api/column'),
            this.http.get('http://localhost:8080/api/card'),
            this.http.get('http://localhost:8080/api/comment'),
        ]).subscribe((result: [Object, Object, Object]) => {
            this.columns = (result[0] as ColumnsResponse).columns;
            this.cards = (result[1] as CardsResponse).cards;
            this.comments = (result[2] as CommentsResponse).comments;

            this.board = [];
            for (const column of this.columns) {
                const newColumn = {
                    ...column,
                    cards: [] as any,
                };
                for (const card of this.cards) {
                    const newCard = {
                        ...card,
                        comments: [] as any,
                    };
                    for (const comment of this.comments) {
                        if (card._id === comment.parentId) {
                            newCard.comments.push(comment);
                        }
                    }
                    if (column._id === card.parentId) {
                        newColumn.cards.push(newCard);
                    }
                }
                this.board.push(newColumn);
            }

            this.board$.next([...this.board]);
        });
    }

    getBoard$() {
        return this.board$.asObservable();
    }

    getColors() {
        return this.colors;
    }

    private getColorForColumn() {
        const color = this.colors[this.colorIndex];
        if (++this.colorIndex > 9) {
            this.colorIndex = 0;
        }

        return color;
    }

    // Column
    addColumn(title: string) {
        const user = this.authService.getUser();
        this.http
            .post('http://localhost:8080/api/column', {
                createdByName: user?.firstname + ' ' + user?.lastname,
                createdByEmail: user?.email,
                title: title,
                color: this.getColorForColumn(),
            })
            .subscribe(() => {
                this.loadBoard();
            });
    }

    changeColor(columnId: string, color: string) {
        const column = this.columns.find(
            (column) => column._id === columnId
        ) as Column;

        column.color = color;

        this.http
            .put('http://localhost:8080/api/column', {
                column,
            })
            .subscribe(() => {
                this.loadBoard();
            });
    }

    clearColumn(columnId: string) {
        this.http
            .delete('http://localhost:8080/api/card/clearColumn/' + columnId)
            .subscribe(() => {
                this.loadBoard();
            });
    }

    editColumn(columnId: string, title: string) {
        const column = this.columns.find(
            (column) => column._id === columnId
        ) as Column;

        column.title = title;

        this.http
            .put('http://localhost:8080/api/column', {
                column,
            })
            .subscribe(() => {
                this.loadBoard();
            });
    }

    deleteColumn(columnId: string) {
        this.http
            .delete('http://localhost:8080/api/column/' + columnId)
            .subscribe(() => {
                this.loadBoard();
            });
    }

    // Cards
    addCard(columnId: string, text: string) {
        const user = this.authService.getUser();

        this.http
            .post('http://localhost:8080/api/card', {
                createdByName: user?.firstname + ' ' + user?.lastname,
                createdByEmail: user?.email,
                parentId: columnId,
                text,
            })
            .subscribe(() => this.changeCardsIndex(columnId, 0, 1, false));
    }

    changeCardParent(
        newParentColumnId: string,
        cardId: string,
        newIndex: number
    ) {
        this.cards;
        const addedCard = this.cards.find(
            (card) => card._id === cardId
        ) as Card;
        const sameParent = addedCard.parentId === newParentColumnId;
        const prevIndex = addedCard.columnIndex;
        const prevColumn = addedCard.parentId;

        addedCard.parentId = newParentColumnId;
        addedCard.columnIndex = newIndex;

        this.cards.map((card) => {
            if (addedCard._id === card._id) {
                card.parentId = newParentColumnId;
                card.columnIndex = newIndex;
            }
            return card;
        });

        this.http
            .put('http://localhost:8080/api/card', {
                card: addedCard,
            })
            .subscribe(() =>
                this.changeCardsIndex(
                    newParentColumnId,
                    newIndex,
                    1,
                    sameParent,
                    prevIndex,
                    addedCard._id,
                    prevColumn
                )
            );
    }

    changeCardsIndex(
        parentColumnId: string,
        index: number,
        change: number,
        sameColumn: boolean,
        prevIndex?: number,
        addedCardId?: string,
        prevColumn?: string
    ) {
        const cards = this.cards
            .filter((card) => {
                if (card.parentId === parentColumnId) {
                    if (addedCardId && addedCardId === card._id) {
                        return false;
                    }
                    if (sameColumn) {
                        if (index > (prevIndex as number)) {
                            return (
                                (prevIndex as number) < card.columnIndex &&
                                card.columnIndex <= index
                            );
                        } else if ((prevIndex as number) > index) {
                            return (
                                index <= card.columnIndex &&
                                card.columnIndex < (prevIndex as number)
                            );
                        }
                        return false;
                    } else {
                        return card.columnIndex >= index;
                    }
                }
                if (prevColumn && !sameColumn && card.parentId === prevColumn) {
                    return card.columnIndex > (prevIndex as number);
                }
                return false;
            })
            .map((card) => {
                if (sameColumn) {
                    if (index > (prevIndex as number)) {
                        card.columnIndex -= change;
                    } else {
                        card.columnIndex += change;
                    }
                } else if (
                    prevColumn &&
                    !sameColumn &&
                    card.parentId === prevColumn
                ) {
                    card.columnIndex -= change;
                } else {
                    card.columnIndex += change;
                }

                return card;
            });

        const httpPutObsArr = cards.map((card) =>
            this.http.put('http://localhost:8080/api/card', {
                card,
            })
        );

        forkJoin(httpPutObsArr).subscribe(() => this.loadBoard());
    }

    editCard(cardId: string, text: string) {
        const card = this.cards.find((card) => card._id === cardId) as Card;
        card.text = text;

        this.http
            .put('http://localhost:8080/api/card', {
                card,
            })
            .subscribe(() => {
                this.loadBoard();
            });
    }

    deleteCard(cardId: string) {
        const deletedCard = this.cards.find(
            (card) => card._id === cardId
        ) as Card;

        this.http
            .delete('http://localhost:8080/api/card/' + cardId)
            .subscribe(() =>
                this.changeCardsIndex(
                    deletedCard.parentId,
                    deletedCard.columnIndex,
                    -1,
                    false
                )
            );
    }

    pinCard(cardId: string) {
        const card = this.cards.find((card) => card._id === cardId) as Card;

        card.pin = !card.pin;

        this.http
            .put('http://localhost:8080/api/card', {
                card,
            })
            .subscribe(() => {
                this.loadBoard();
            });
    }

    changeLikes(cardId: string, change: number) {
        const card = this.cards.find((card) => card._id === cardId) as Card;

        card.likes += change;
        card.likes = card.likes < 0 ? 0 : card.likes;

        this.http
            .put('http://localhost:8080/api/card', {
                card,
            })
            .subscribe(() => {
                this.loadBoard();
            });
    }

    // Comments
    addComment(cardId: string, text: string) {
        const user = this.authService.getUser();
        this.http
            .post('http://localhost:8080/api/comment', {
                createdByName: user?.firstname + ' ' + user?.lastname,
                createdByEmail: user?.email,
                parentId: cardId,
                text,
            })
            .subscribe(() => {
                this.loadBoard();
            });
    }

    deleteComment(commentId: string) {
        this.http
            .delete('http://localhost:8080/api/comment/' + commentId)
            .subscribe(() => {
                this.loadBoard();
            });
    }
}
