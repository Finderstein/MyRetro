import { Pipe, PipeTransform } from '@angular/core';
import { ServiceCard } from '../models/service-board.model';

@Pipe({
    name: 'sortCards',
})
export class SortCardsPipe implements PipeTransform {
    transform(array: ServiceCard[]): ServiceCard[] {
        array.sort((a: ServiceCard, b: ServiceCard) => {
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
