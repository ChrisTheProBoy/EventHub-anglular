import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.css'
})
export class BookingsListComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    // Subscribe to bookings from service
    this.bookingsService.bookings$.subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  cancelBooking(bookingId: number): void {
    this.bookingsService.removeBooking(bookingId);
    alert('Booking cancelled successfully!');
  }
}
