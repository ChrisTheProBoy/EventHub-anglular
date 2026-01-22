import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  eventId: string | null = null;
  isSubmitted = false;
  eventName = 'Event';
  eventDate = '';
  eventPrice = 99.99;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.loadEventDetails();
    });

    this.initializeForm();
  }

  private loadEventDetails(): void {
    // TODO: Load event details from service using eventId
    // For now, using sample data
    const eventId = this.eventId || '1';
    const events: any = {
      '1': { name: 'Tech Conference 2026', date: '2026-03-15', price: 99.99 },
      '2': { name: 'Web Development Workshop', date: '2026-02-20', price: 79.99 },
      '3': { name: 'AI Summit', date: '2026-04-10', price: 89.99 }
    };
    const event = events[eventId] || events['1'];
    this.eventName = event.name;
    this.eventDate = event.date;
    this.eventPrice = event.price;
  }

  initializeForm(): void {
    this.bookingForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      numberOfTickets: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      specialRequirements: ['']
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  submitBooking(): void {
    this.isSubmitted = true;

    if (this.bookingForm.invalid) {
      return;
    }

    // Add booking to service
    const bookingData = {
      ...this.bookingForm.value,
      eventId: this.eventId
    };

    this.bookingsService.addBooking(
      bookingData,
      this.eventName,
      this.eventDate,
      this.eventPrice
    );

    alert('Booking confirmed successfully! Check your bookings page.');
    this.router.navigate(['/bookings']);
  }
}
