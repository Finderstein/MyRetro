import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-body',
    templateUrl: './dialog-body.component.html',
    styleUrls: ['./dialog-body.component.scss'],
})
export class DialogBodyComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DialogBodyComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onNoClick() {
        this.dialogRef.close();
    }

    ngOnInit(): void {}
}
