import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Booking {
  id: number;
  eventId: string;
  eventName: string;
  eventDate: string;
  bookingDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  totalPrice: number;
  specialRequirements?: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  bookings$ = this.bookingsSubject.asObservable();
  private nextId = 1;

  constructor() {
    this.loadBookingsFromStorage();
  }

  private loadBookingsFromStorage(): void {
    const stored = localStorage.getItem('bookings');
    if (stored) {
      const bookings = JSON.parse(stored);
      this.nextId = Math.max(...bookings.map((b: Booking) => b.id), 0) + 1;
      this.bookingsSubject.next(bookings);
    }
  }

  getBookings(): Booking[] {
    return this.bookingsSubject.value;
  }

  addBooking(bookingData: any, eventName: string, eventDate: string, eventPrice: number): void {
    const newBooking: Booking = {
      id: this.nextId++,
      eventId: bookingData.eventId,
      eventName: eventName,
      eventDate: eventDate,
      bookingDate: new Date().toISOString().split('T')[0],
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      numberOfTickets: bookingData.numberOfTickets,
      totalPrice: bookingData.numberOfTickets * eventPrice,
      specialRequirements: bookingData.specialRequirements,
      status: 'confirmed'
    };

    const currentBookings = this.bookingsSubject.value;
    const updatedBookings = [...currentBookings, newBooking];
    this.bookingsSubject.next(updatedBookings);
    this.saveBookingsToStorage(updatedBookings);
  }

  removeBooking(bookingId: number): void {
    const currentBookings = this.bookingsSubject.value;
    const updatedBookings = currentBookings.filter(b => b.id !== bookingId);
    this.bookingsSubject.next(updatedBookings);
    this.saveBookingsToStorage(updatedBookings);
  }

  private saveBookingsToStorage(bookings: Booking[]): void {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
}
