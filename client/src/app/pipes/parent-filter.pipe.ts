import { Pipe, PipeTransform } from '@angular/core';
import { Card, Comment } from '../models/column.model';

@Pipe({
    name: 'parentFilter',
})
export class ParentFilterPipe implements PipeTransform {
    transform(arr: any[], parentId: string | undefined): any[] {
        if (!parentId || !parentId.trim()) {
            return arr;
        }

        return arr.filter((item: Card | Comment) => item.parentId === parentId);
    }
}
