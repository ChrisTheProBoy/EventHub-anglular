import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event.model';

@Pipe({
    name: 'filterEvents',
    standalone: true,
    pure: true
})
export class FilterEventsPipe implements PipeTransform {
    transform(events: Event[], category?: string, maxPrice?: number, searchQuery?: string, dateFrom?: string): Event[] {
        if (!events) return [];

        return events.filter(event => {
            const categoryMatch = !category || category === 'All' || event.category === category;
            const priceMatch = maxPrice === undefined || event.price <= maxPrice;
            const queryLower = (searchQuery || '').toLowerCase();
            const queryMatch = !queryLower ||
                event.name.toLowerCase().includes(queryLower) ||
                event.description.toLowerCase().includes(queryLower) ||
                event.location.toLowerCase().includes(queryLower) ||
                event.tags.some(t => t.toLowerCase().includes(queryLower));
            const dateMatch = !dateFrom || event.date >= dateFrom;

            return categoryMatch && priceMatch && queryMatch && dateMatch;
        });
    }
}
