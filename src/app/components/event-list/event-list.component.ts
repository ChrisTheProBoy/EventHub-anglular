import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // TODO: Load events from service
    this.loadEvents();
  }

  loadEvents(): void {
    // Placeholder events data
    this.events = [
      { id: 1, name: 'Tech Conference 2026', date: '2026-03-15', location: 'San Francisco, CA' },
      { id: 2, name: 'Web Development Workshop', date: '2026-02-20', location: 'New York, NY' },
      { id: 3, name: 'AI Summit', date: '2026-04-10', location: 'Boston, MA' }
    ];
  }
}
