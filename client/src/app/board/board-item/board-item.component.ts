import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/board.model';
import { ServiceCard } from 'src/app/models/service-board.model';
import { BoardService } from 'src/app/services/board.service';

@Component({
    selector: 'app-board-item',
    templateUrl: './board-item.component.html',
    styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
    @Input()
    card!: ServiceCard;

    @Output()
    emitAddComment: EventEmitter<any> = new EventEmitter();
    @Output()
    emitLike: EventEmitter<any> = new EventEmitter();
    @Output()
    emitDeleteCard: EventEmitter<any> = new EventEmitter();
    @Output()
    emitPinCard: EventEmitter<any> = new EventEmitter();
    @Output()
    emitEditCard: EventEmitter<any> = new EventEmitter();

    commentInput = '';
    open = false;

    constructor(private boardService: BoardService) {}

    ngOnInit(): void {}

    onCommentEmit(cardId: string) {
        this.emitAddComment.emit({ cardId, text: this.commentInput });
        this.commentInput = '';
    }

    onLikeEmit(cardId: string, change: number) {
        this.emitLike.emit({ cardId, change });
    }

    onCardDeleteEmit(cardId: string) {
        this.emitDeleteCard.emit({ cardId });
    }

    onCardPinEmit(cardId: string) {
        this.emitPinCard.emit({ cardId });
    }

    onEditCardEmit(text: string, cardId: string) {
        if (text && text.trim()) {
            this.emitEditCard.emit({ cardId, text });
        }
    }
}
