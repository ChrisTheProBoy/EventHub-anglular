import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventListComponent,
    data: { title: 'All Events' }
  },
  {
    path: 'event/:id',
    component: EventDetailComponent,
    data: { title: 'Event Details' }
  },
  {
    path: 'booking/:id',
    component: BookingFormComponent,
    data: { title: 'Book Event' }
  },
  {
    path: 'bookings',
    component: BookingsListComponent,
    data: { title: 'My Bookings' }
  },
  {
    path: '**',
    redirectTo: '/events'
  }
];
