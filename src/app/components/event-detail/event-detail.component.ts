import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  event: any;
  eventId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.loadEventDetails();
    });
  }

  loadEventDetails(): void {
    // TODO: Load event details from service using eventId
    this.event = {
      id: this.eventId,
      name: 'Tech Conference 2026',
      date: '2026-03-15',
      location: 'San Francisco, CA',
      description: 'Join us for the biggest tech conference of the year featuring keynotes from industry leaders, networking opportunities, and hands-on workshops.',
      capacity: 500,
      attendees: 350,
      price: 99.99
    };
  }

  bookEvent(): void {
    // Navigate to booking form
    // this.router.navigate(['/booking', this.eventId]);
  }
}
