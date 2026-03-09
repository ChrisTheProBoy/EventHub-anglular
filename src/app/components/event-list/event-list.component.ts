import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { EventService } from '../../services/event.service';
import { Event, EventCategory } from '../../models/event.model';
import { FilterEventsPipe } from '../../pipes/filter-events.pipe';
import { FeaturedEventDirective } from '../../directives/featured-event.directive';
import { SoldOutDirective } from '../../directives/sold-out.directive';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule, AsyncPipe, DatePipe, CurrencyPipe, RouterModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatInputModule,
    MatFormFieldModule, MatSliderModule, MatBadgeModule, MatProgressBarModule, MatTooltipModule,
    FilterEventsPipe, FeaturedEventDirective, SoldOutDirective
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events$!: Observable<Event[]>;
  categories: EventCategory[] = ['All', 'Technology', 'Music', 'Art', 'Business', 'Sports', 'Health'];
  selectedCategory: EventCategory = 'All';
  maxPrice = 500;
  searchQuery = '';
  dateFrom = '';
  isFilterOpen = false;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
  }

  selectCategory(cat: EventCategory): void {
    this.selectedCategory = cat;
  }

  clearFilters(): void {
    this.selectedCategory = 'All';
    this.maxPrice = 500;
    this.searchQuery = '';
    this.dateFrom = '';
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  getCapacityPercent(attendees: number, capacity: number): number {
    return Math.min((attendees / capacity) * 100, 100);
  }

  getCapacityClass(attendees: number, capacity: number): string {
    const pct = (attendees / capacity) * 100;
    if (pct >= 100) return 'capacity-full';
    if (pct >= 80) return 'capacity-high';
    if (pct >= 50) return 'capacity-mid';
    return 'capacity-low';
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

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'Technology': 'computer', 'Music': 'music_note', 'Art': 'palette',
      'Business': 'business_center', 'Sports': 'sports_basketball', 'Health': 'self_improvement'
    };
    return icons[category] || 'event';
  }
}
