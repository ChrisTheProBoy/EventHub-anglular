import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { ScheduleItem } from '../../models/event.model';

@Component({
    selector: 'app-event-schedule',
    standalone: true,
    imports: [CommonModule, MatListModule, MatIconModule, MatChipsModule],
    templateUrl: './event-schedule.component.html',
    styleUrl: './event-schedule.component.css'
})
export class EventScheduleComponent implements OnInit {
    schedule$!: Observable<ScheduleItem[]>;

    constructor(private route: ActivatedRoute, private eventService: EventService) { }

    ngOnInit(): void {
        const id = this.route.parent?.snapshot.paramMap.get('id') || '';
        this.schedule$ = this.eventService.getEventById(id).pipe(
            map(event => event?.schedule || [])
        );
    }

    getTypeIcon(type: string): string {
        const icons: Record<string, string> = {
            'keynote': 'mic', 'talk': 'record_voice_over', 'workshop': 'build',
            'break': 'restaurant', 'networking': 'people'
        };
        return icons[type] || 'event';
    }

    getTypeColor(type: string): string {
        const colors: Record<string, string> = {
            'keynote': '#667eea', 'talk': '#43e97b', 'workshop': '#f093fb',
            'break': '#fa709a', 'networking': '#4facfe'
        };
        return colors[type] || '#ccc';
    }
}
