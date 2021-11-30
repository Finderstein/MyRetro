import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/models/column.model';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
    @Input()
    comment!: Comment;

    @Output() emitDeleteComment: EventEmitter<any> = new EventEmitter();

    onCommentEmit(comment: Comment) {
        this.emitDeleteComment.emit(comment);
    }
}
