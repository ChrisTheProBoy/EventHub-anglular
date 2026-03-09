import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventService } from '../../services/event.service';
import { BookingsService } from '../../services/bookings.service';
import { Event } from '../../models/event.model';
import { BookingConfirmationDialogComponent } from '../booking-confirmation-dialog/booking-confirmation-dialog.component';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule, AsyncPipe, CurrencyPipe, ReactiveFormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatSelectModule, MatDividerModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule
  ],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  event$!: Observable<Event | undefined>;
  currentEvent: Event | null = null;
  isSubmitting = false;
  ticketCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private bookingsService: BookingsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(
      switchMap(params => this.eventService.getEventById(params.get('id') || ''))
    );
    this.event$.subscribe(event => { if (event) this.currentEvent = event; });
    this.initForm();
  }

  private initForm(): void {
    this.bookingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{7,15}$/)]],
      numberOfTickets: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      specialRequirements: ['']
    });
  }

  get f() { return this.bookingForm.controls; }

  get totalPrice(): number {
    if (!this.currentEvent) return 0;
    return (this.f['numberOfTickets'].value || 1) * this.currentEvent.price;
  }

  onSubmit(): void {
    if (this.bookingForm.invalid || !this.currentEvent) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const booking = this.bookingsService.addBooking(
      { ...this.bookingForm.value, eventId: this.currentEvent.id },
      this.currentEvent.name,
      this.currentEvent.date,
      this.currentEvent.price
    );
    this.isSubmitting = false;
    const ref = this.dialog.open(BookingConfirmationDialogComponent, {
      width: '480px',
      data: { booking, event: this.currentEvent },
      disableClose: true
    });
    ref.afterClosed().subscribe(() => this.router.navigate(['/bookings']));
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
