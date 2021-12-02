import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    @Input()
    question!: string;
    @Input()
    text: string | undefined;
    @Input()
    editColumn: boolean | undefined;

    @Output()
    emitAdd: EventEmitter<any> = new EventEmitter();
    @Output()
    emitEdit: EventEmitter<any> = new EventEmitter();

    constructor(public dialog: MatDialog) {}

    openDialog() {
        const dialogRef = this.dialog.open(DialogBodyComponent, {
            width: '400px',
            data: { question: this.question, text: this.text },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (this.text) {
                this.emitEdit.emit(result);
            } else {
                this.emitAdd.emit(result);
            }
        });
    }
}
