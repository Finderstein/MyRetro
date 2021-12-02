import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { BoardItemComponent } from './board-item/board-item.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { DialogModule } from '../dialog/dialog.module';
import { MatMenuModule } from '@angular/material/menu';
import { FilterCardsPipe } from '../pipes/filter-cards.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { SortCardsPipe } from '../pipes/sort-cards.pipe';

@NgModule({
    declarations: [
        BoardComponent,
        BoardItemComponent,
        CommentItemComponent,
        FilterCardsPipe,
        SortCardsPipe,
    ],
    imports: [
        CommonModule,
        DialogModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        DragDropModule,
        MatExpansionModule,
        FormsModule,
        MatMenuModule,
        MatToolbarModule,
        MatFormFieldModule,
        HttpClientModule,
    ],
    exports: [BoardComponent],
})
export class BoardModule {}
