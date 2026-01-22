# EventHub - Event Management System

A modern, responsive Angular application for managing events and bookings. Users can browse events, view event details, book tickets, and manage their bookings from a centralized dashboard.

## Features

- **Event Listing**: Browse all available events with details like date, location, and capacity
- **Event Details**: View comprehensive information about each event including description, pricing, and attendee count
- **Booking System**: Easy-to-use form to book tickets for events with validation
- **My Bookings**: View, manage, and cancel your event bookings
- **Persistent Storage**: Bookings are saved to browser's localStorage for data persistence
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Clean Navigation**: Intuitive navbar for easy navigation between pages

## Tech Stack

- **Framework**: Angular 19+ (Standalone Components)
- **Language**: TypeScript
- **Styling**: CSS3
- **State Management**: RxJS (BehaviorSubject)
- **Build Tool**: Angular CLI with esbuild
- **Storage**: Browser localStorage

## Project Structure

```
src/
 app/
    components/
       navbar/                 # Navigation bar component
       event-list/             # Events listing page
       event-detail/           # Event details page
       booking-form/           # Booking form component
       bookings-list/          # User bookings page
    services/
       bookings.service.ts     # Bookings management service
    app.routes.ts               # Application routing configuration
    app.config.ts               # Application configuration
    app.ts                      # Root component
    app.html                    # Root template
 main.ts                         # Application entry point
 index.html                      # HTML entry point
 styles.css                      # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Navigate to the project directory
   ```bash
   cd cia_project
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   ng serve -o
   ```

## Usage Guide

### Browsing Events
- Navigate to the Events page from the navbar
- View all available events in a grid layout
- Click View Details on any event card

### Viewing Event Details
- See event description, price, and capacity information
- View attendance progress bar
- Click Book Now to start booking

### Booking Tickets
1. Fill out the booking form with personal details
2. Select number of tickets (1-10)
3. Add special requirements if needed
4. Click Complete Booking
5. Redirected to My Bookings page to confirm

### Managing Your Bookings
- Click My Bookings in navbar
- View all your bookings in a table
- Click Cancel to cancel any booking

## Services

### BookingsService
- Manages all booking operations
- Automatic localStorage persistence
- Real-time updates via RxJS Observable
- Unique booking ID generation

## Sample Events

1. **Tech Conference 2026** - March 15, 2026 | San Francisco, CA | \.99
2. **Web Development Workshop** - February 20, 2026 | New York, NY | \.99
3. **AI Summit** - April 10, 2026 | Boston, MA | \.99

## Routing

- \/\  Redirects to /events
- \/events\  Event listing page
- \/event/:id\  Event detail page
- \/booking/:id\  Booking form
- \/bookings\  User's booking list

## Data Persistence

- Bookings automatically save to localStorage
- Data persists across browser sessions
- Clear browser data to reset all bookings

## Troubleshooting

### Port Already in Use
```bash
ng serve --port 4300
```

### Clear Browser Cache
1. Open DevTools (F12)
2. Go to Application  Local Storage
3. Clear the bookings entry

## Version

Current Version: 1.0.0
Last Updated: January 22, 2026

---

**Happy Event Booking! **
