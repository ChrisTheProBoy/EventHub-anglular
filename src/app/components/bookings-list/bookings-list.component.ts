import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe, DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { BookingsService } from '../../services/bookings.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [
    CommonModule, AsyncPipe, DatePipe, CurrencyPipe, TitleCasePipe, RouterModule,
    MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatSortModule,
    MatPaginatorModule, MatChipsModule, MatDialogModule, MatTooltipModule
  ],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.css'
})
export class BookingsListComponent implements OnInit {
  bookings$!: Observable<Booking[]>;
  displayedColumns = ['eventName', 'eventDate', 'bookingDate', 'tickets', 'total', 'status', 'action'];
  pageSize = 10;
  pageIndex = 0;
  sortField = 'bookingDate';
  sortDir: 'asc' | 'desc' = 'desc';

  constructor(
    private bookingsService: BookingsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.bookings$ = this.bookingsService.bookings$;
  }

  get totalSpent(): number {
    return this.bookingsService.getTotalSpent();
  }

  cancelBooking(booking: Booking): void {
    if (booking.status === 'cancelled') return;
    // Inline confirmation without a second dialog import
    if (confirm(`Cancel booking for "${booking.eventName}"?`)) {
      this.bookingsService.cancelBooking(booking.id);
    }
  }

  removeBooking(bookingId: number): void {
    if (confirm('Remove this booking from your history?')) {
      this.bookingsService.removeBooking(bookingId);
    }
  }

  sortData(sort: Sort): void {
    this.sortField = sort.active;
    this.sortDir = (sort.direction as 'asc' | 'desc') || 'desc';
  }

  paginateBookings(bookings: Booking[]): Booking[] {
    const sorted = [...bookings].sort((a, b) => {
      const aVal = (a as any)[this.sortField] ?? '';
      const bVal = (b as any)[this.sortField] ?? '';
      return (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) * (this.sortDir === 'asc' ? 1 : -1);
    });
    return sorted.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  onPage(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
  }
}
