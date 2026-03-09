import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';
import { LoginComponent } from './components/login/login.component';
import { EventScheduleComponent } from './components/event-schedule/event-schedule.component';
import { EventSpeakersComponent } from './components/event-speakers/event-speakers.component';
import { authGuard } from './guards/auth.guard';

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
    data: { title: 'Event Details' },
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
      { path: 'about', component: EventDetailComponent },
      { path: 'schedule', component: EventScheduleComponent },
      { path: 'speakers', component: EventSpeakersComponent }
    ]
  },
  {
    path: 'booking/:id',
    component: BookingFormComponent,
    canActivate: [authGuard],
    data: { title: 'Book Event' }
  },
  {
    path: 'bookings',
    component: BookingsListComponent,
    data: { title: 'My Bookings' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: '**',
    redirectTo: '/events'
  }
];
