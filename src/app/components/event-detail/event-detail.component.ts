import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../models/event.model';
import { EventScheduleComponent } from '../event-schedule/event-schedule.component';
import { EventSpeakersComponent } from '../event-speakers/event-speakers.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule, AsyncPipe, DatePipe, CurrencyPipe, RouterModule,
    MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, MatProgressBarModule,
    MatChipsModule, MatDividerModule, MatTooltipModule,
    EventScheduleComponent, EventSpeakersComponent
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  event$!: Observable<Event | undefined>;
  activeTab = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(
      switchMap(params => this.eventService.getEventById(params.get('id') || ''))
    );
  }

  getCapacityPercent(attendees: number, capacity: number): number {
    return Math.min((attendees / capacity) * 100, 100);
  }

  getCapacityStatus(attendees: number, capacity: number): string {
    const pct = (attendees / capacity) * 100;
    if (pct >= 100) return 'Sold Out';
    if (pct >= 90) return 'Almost Full';
    if (pct >= 70) return 'Filling Up';
    return 'Available';
  }

  getCategoryGradient(category: string): string {
    const gradients: Record<string, string> = {
      'Technology': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Music': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Art': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'Business': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'Sports': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'Health': 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    };
    return gradients[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  bookEvent(event: Event): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/booking', event.id]);
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: `/booking/${event.id}` } });
    }
  }
}
