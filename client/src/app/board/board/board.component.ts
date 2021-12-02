import { Component } from '@angular/core';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';
import { Comment } from 'src/app/models/board.model';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
    constructor(public boardService: BoardService) {}

    searchCard = '';

    drop(event: CdkDragDrop<string[]>, columnId: string) {
        this.boardService.changeCardParent(
            columnId,
            event.item.data._id,
            event.currentIndex
        );
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    onDeleteComment(comment: Comment) {
        this.boardService.deleteComment(comment._id);
    }

    onAddComment(event: { cardId: string; text: string }) {
        this.boardService.addComment(event.cardId, event.text);
    }

    onChangeLikes(event: { cardId: string; change: number }) {
        this.boardService.changeLikes(event.cardId, event.change);
    }

    onDeleteCard(event: { cardId: string }) {
        this.boardService.deleteCard(event.cardId);
    }

    onPinCard(event: { cardId: string }) {
        this.boardService.pinCard(event.cardId);
    }

    onDeleteColumn(columnId: string) {
        this.boardService.deleteColumn(columnId);
    }

    onAddCard(text: string, columnId: string) {
        if (text && text.trim()) {
            this.boardService.addCard(columnId, text);
        }
    }

    onChangeColor(columnId: string, color: string) {
        this.boardService.changeColor(columnId, color);
    }

    onAddColumn(title: string) {
        if (title && title.trim()) {
            this.boardService.addColumn(title);
        }
    }

    onClearColumn(columnId: string) {
        this.boardService.clearColumn(columnId);
    }

    onEditColumn(title: string, columnId: string) {
        if (title && title.trim()) {
            this.boardService.editColumn(columnId, title);
        }
    }

    onEditCard(event: { cardId: string; text: string }) {
        this.boardService.editCard(event.cardId, event.text);
    }
}
