import { Component, Inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Booking } from '../../models/booking.model';
import { Event } from '../../models/event.model';

interface DialogData {
    booking: Booking;
    event: Event;
}

@Component({
    selector: 'app-booking-confirmation-dialog',
    standalone: true,
    imports: [CommonModule, CurrencyPipe, DatePipe, MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule],
    template: `
    <div class="dialog-container">
      <div class="dialog-success-icon">
        <mat-icon>check_circle</mat-icon>
      </div>
      <h2 mat-dialog-title class="dialog-title">Booking Confirmed!</h2>
      <mat-dialog-content class="dialog-content">
        <p class="confirmation-msg">Your ticket has been booked successfully.</p>
        <div class="booking-summary">
          <div class="summary-row">
            <span>Event</span>
            <strong>{{ data.booking.eventName }}</strong>
          </div>
          <div class="summary-row">
            <span>Name</span>
            <strong>{{ data.booking.firstName }} {{ data.booking.lastName }}</strong>
          </div>
          <div class="summary-row">
            <span>Date</span>
            <strong>{{ data.booking.eventDate | date:'MMMM dd, yyyy' }}</strong>
          </div>
          <div class="summary-row">
            <span>Tickets</span>
            <strong>{{ data.booking.numberOfTickets }}</strong>
          </div>
          <mat-divider style="margin: 8px 0"></mat-divider>
          <div class="summary-row total">
            <span>Total Paid</span>
            <strong class="total-val">{{ data.booking.totalPrice | currency }}</strong>
          </div>
        </div>
        <p class="booking-ref">Booking ID: <code>#{{ data.booking.id }}</code></p>
      </mat-dialog-content>
      <mat-dialog-actions align="center">
        <button mat-flat-button color="primary" (mat-dialog-close)="close()" class="close-btn">
          <mat-icon>list_alt</mat-icon> View My Bookings
        </button>
      </mat-dialog-actions>
    </div>
  `,
    styles: [`
    .dialog-container { text-align: center; padding: 8px; }
    .dialog-success-icon { margin: 16px 0 8px; }
    .dialog-success-icon .mat-icon { font-size: 72px; width: 72px; height: 72px; color: #43e97b; }
    .dialog-title { font-size: 1.5rem; font-weight: 800; color: #1a1a2e; margin-bottom: 0; }
    .dialog-content { padding: 0 8px; }
    .confirmation-msg { color: #666; margin-bottom: 20px; }
    .booking-summary { background: #f8f9ff; border-radius: 12px; padding: 16px; text-align: left; margin-bottom: 16px; }
    .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.9rem; color: #555; }
    .summary-row.total { font-size: 1rem; padding-top: 12px; }
    .total-val { color: #667eea; font-size: 1.2rem; }
    .booking-ref { font-size: 0.8rem; color: #aaa; }
    .booking-ref code { background: #f0f4ff; padding: 2px 8px; border-radius: 4px; color: #667eea; font-weight: 700; }
    .close-btn { border-radius: 12px !important; height: 44px; padding: 0 24px; display: flex; align-items: center; gap: 8px; }
  `]
})
export class BookingConfirmationDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private dialogRef: MatDialogRef<BookingConfirmationDialogComponent>
    ) { }

    close(): void {
        this.dialogRef.close();
    }
}
