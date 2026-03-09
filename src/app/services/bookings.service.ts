import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking, BookingFormData } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private readonly STORAGE_KEY = 'eventhub_bookings';
  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  bookings$ = this.bookingsSubject.asObservable();
  private nextId = 1;

  constructor() {
    this.loadBookingsFromStorage();
  }

  private loadBookingsFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const bookings: Booking[] = JSON.parse(stored);
      this.nextId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
      this.bookingsSubject.next(bookings);
    }
  }

  private saveBookingsToStorage(bookings: Booking[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
  }

  getBookings(): Booking[] {
    return this.bookingsSubject.value;
  }

  getBookingsByEmail(email: string): Booking[] {
    return this.bookingsSubject.value.filter(b => b.email === email);
  }

  getTotalSpent(): number {
    return this.bookingsSubject.value.reduce((total, b) => total + b.totalPrice, 0);
  }

  addBooking(formData: BookingFormData, eventName: string, eventDate: string, eventPrice: number): Booking {
    const newBooking: Booking = {
      id: this.nextId++,
      eventId: formData.eventId,
      eventName,
      eventDate,
      bookingDate: new Date().toISOString().split('T')[0],
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      numberOfTickets: formData.numberOfTickets,
      totalPrice: formData.numberOfTickets * eventPrice,
      specialRequirements: formData.specialRequirements,
      status: 'confirmed'
    };

    const updated = [...this.bookingsSubject.value, newBooking];
    this.bookingsSubject.next(updated);
    this.saveBookingsToStorage(updated);
    return newBooking;
  }

  cancelBooking(bookingId: number): void {
    const updated = this.bookingsSubject.value.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    this.bookingsSubject.next(updated);
    this.saveBookingsToStorage(updated);
  }

  removeBooking(bookingId: number): void {
    const updated = this.bookingsSubject.value.filter(b => b.id !== bookingId);
    this.bookingsSubject.next(updated);
    this.saveBookingsToStorage(updated);
  }
}
