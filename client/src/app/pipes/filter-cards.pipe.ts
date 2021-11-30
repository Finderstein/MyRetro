import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/column.model';

@Pipe({
    name: 'filterCards',
})
export class FilterCardsPipe implements PipeTransform {
    transform(cards: any[], search: string): any[] {
        if (!search || !search.trim()) {
            return cards;
        }

        return cards.filter((card) => {
            return card.text.includes(search);
        });
    }
}
