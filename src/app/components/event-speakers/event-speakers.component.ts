import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { Speaker } from '../../models/event.model';

@Component({
    selector: 'app-event-speakers',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule],
    templateUrl: './event-speakers.component.html',
    styleUrl: './event-speakers.component.css'
})
export class EventSpeakersComponent implements OnInit {
    speakers$!: Observable<Speaker[]>;

    constructor(private route: ActivatedRoute, private eventService: EventService) { }

    ngOnInit(): void {
        const id = this.route.parent?.snapshot.paramMap.get('id') || '';
        this.speakers$ = this.eventService.getEventById(id).pipe(
            map(event => event?.speakers || [])
        );
    }

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
}
