import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, catchError, tap, shareReplay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Event, EventCategory } from '../models/event.model';

export interface EventFilter {
    category: EventCategory;
    maxPrice: number;
    searchQuery: string;
    dateFrom?: string;
}

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private readonly dataUrl = 'assets/data/events.json';

    private eventsCache$: Observable<Event[]> | null = null;
    private filterSubject = new BehaviorSubject<EventFilter>({
        category: 'All',
        maxPrice: 500,
        searchQuery: ''
    });

    filter$ = this.filterSubject.asObservable();

    constructor(private http: HttpClient) { }

    private fetchEvents(): Observable<Event[]> {
        if (!this.eventsCache$) {
            this.eventsCache$ = this.http.get<{ events: Event[] }>(this.dataUrl).pipe(
                map(response => response.events),
                tap(events => console.log(`Loaded ${events.length} events`)),
                catchError(err => {
                    console.error('Failed to load events:', err);
                    return throwError(() => new Error('Could not load events. Please try again.'));
                }),
                shareReplay(1)
            );
        }
        return this.eventsCache$;
    }

    getEvents(): Observable<Event[]> {
        return this.fetchEvents();
    }

    getFilteredEvents(): Observable<Event[]> {
        return combineLatest([this.fetchEvents(), this.filter$]).pipe(
            map(([events, filter]) => this.applyFilter(events, filter))
        );
    }

    getEventById(id: string): Observable<Event | undefined> {
        return this.fetchEvents().pipe(
            map(events => events.find(e => e.id === id))
        );
    }

    getFeaturedEvents(): Observable<Event[]> {
        return this.fetchEvents().pipe(
            map(events => events.filter(e => e.isFeatured))
        );
    }

    getEventsByCategory(category: string): Observable<Event[]> {
        return this.fetchEvents().pipe(
            map(events => category === 'All' ? events : events.filter(e => e.category === category))
        );
    }

    setFilter(filter: Partial<EventFilter>): void {
        this.filterSubject.next({ ...this.filterSubject.value, ...filter });
    }

    resetFilter(): void {
        this.filterSubject.next({ category: 'All', maxPrice: 500, searchQuery: '' });
    }

    private applyFilter(events: Event[], filter: EventFilter): Event[] {
        return events.filter(event => {
            const categoryMatch = filter.category === 'All' || event.category === filter.category;
            const priceMatch = event.price <= filter.maxPrice;
            const queryMatch = !filter.searchQuery ||
                event.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
                event.tags.some(t => t.toLowerCase().includes(filter.searchQuery.toLowerCase()));
            const dateMatch = !filter.dateFrom || event.date >= filter.dateFrom;
            return categoryMatch && priceMatch && queryMatch && dateMatch;
        });
    }
}
