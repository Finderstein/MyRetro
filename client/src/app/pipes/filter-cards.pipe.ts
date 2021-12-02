import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/board.model';
import { ServiceCard } from '../models/service-board.model';

@Pipe({
    name: 'filterCards',
})
export class FilterCardsPipe implements PipeTransform {
    transform(cards: ServiceCard[], search: string): ServiceCard[] {
        if (!search || !search.trim()) {
            return cards;
        }

        return cards.filter((card) => {
            return card.text.includes(search);
        });
    }
}
