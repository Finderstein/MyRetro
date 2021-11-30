import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortCards',
})
export class SortCardsPipe implements PipeTransform {
    transform(array: any[]): any[] {
        array.sort((a: any, b: any) => {
            if (a['columnIndex'] < b['columnIndex']) {
                return -1;
            } else if (a['columnIndex'] > b['columnIndex']) {
                return 1;
            } else {
                return 0;
            }
        });

        return array;
    }
}
