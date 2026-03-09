<h1 align="center">
  <br>
  🎫 EventHub
  <br>
</h1>

<h4 align="center">A full-featured Event Management & Booking application built with <a href="https://angular.io" target="_blank">Angular 20</a> and Angular Material.</h4>

<p align="center">
  <img alt="Angular" src="https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Material" src="https://img.shields.io/badge/Angular_Material-20.2-757de8?style=for-the-badge&logo=material-design&logoColor=white">
  <img alt="RxJS" src="https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white">
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-pages--routes">Routes</a> •
  <a href="#-key-concepts-demonstrated">Key Concepts</a>
</p>

---

## ✨ Features

- **Event Discovery** — Browse 12 richly detailed events across 6 categories (Technology, Music, Art, Business, Sports, Health)
- **Smart Filtering** — Filter by category chips, price range slider, keyword search, and date
- **Event Detail Pages** — Full event info with **About**, **Schedule (timeline)**, and **Speakers (cards)** tabs
- **Authentication Flow** — Mock auth system with login/register; `authGuard` protects the booking route
- **Ticket Booking** — Multi-field reactive form with regex validation and a live order summary
- **My Bookings** — Sortable, paginated Material data table with cancel/remove actions
- **Booking Confirmation** — `MatDialog` popup on successful booking
- **Error Handling** — Functional HTTP interceptor displays errors via `MatSnackBar`
- **Responsive UI** — Mobile-first design using CSS Grid and Angular Material

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Angular 20 (Standalone Components) |
| Language | TypeScript 5.9 |
| UI Library | Angular Material 20.2 |
| Animations | @angular/animations |
| HTTP | Angular HttpClient |
| Reactivity | RxJS 7.8 (BehaviorSubject, switchMap, shareReplay…) |
| SSR | @angular/ssr (Express 5) |
| Build Tool | Vite / esbuild via @angular/build |
| Fonts | Inter — Google Fonts |
| Icons | Google Material Icons |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/                         # Toolbar + auth menu + booking badge
│   │   ├── event-list/                     # Event grid with hero & filters
│   │   ├── event-detail/                   # Event page with Material tabs
│   │   ├── event-schedule/                 # Child route — schedule timeline
│   │   ├── event-speakers/                 # Child route — speaker cards
│   │   ├── booking-form/                   # Reactive booking form + order summary
│   │   ├── booking-confirmation-dialog/    # MatDialog success popup
│   │   ├── bookings-list/                  # mat-table + sort + paginator
│   │   └── login/                          # Tabbed login / register forms
│   ├── models/
│   │   ├── event.model.ts                  # Event, Speaker, ScheduleItem
│   │   ├── user.model.ts                   # User, LoginCredentials
│   │   └── booking.model.ts                # Booking, BookingStatus
│   ├── services/
│   │   ├── event.service.ts                # HTTP + RxJS caching
│   │   ├── auth.service.ts                 # BehaviorSubject + localStorage
│   │   └── bookings.service.ts             # Bookings CRUD + localStorage
│   ├── guards/
│   │   └── auth.guard.ts                   # Functional CanActivateFn
│   ├── interceptors/
│   │   └── error.interceptor.ts            # Functional HttpInterceptorFn
│   ├── pipes/
│   │   └── filter-events.pipe.ts           # Pure pipe — filter events
│   ├── directives/
│   │   ├── featured-event.directive.ts     # Gold glow on featured cards
│   │   └── sold-out.directive.ts           # Dimming on sold-out cards
│   ├── app.routes.ts                       # All SPA routes
│   ├── app.routes.server.ts                # SSR route render modes
│   └── app.config.ts                       # Providers + interceptor setup
├── assets/data/
│   └── events.json                         # Mock data — 12 events
├── index.html                              # Inter font + Material icons
└── styles.css                              # Global CSS + custom properties
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20+  
- **Angular CLI** 20 — `npm install -g @angular/cli`

### Install & Run

```bash
# 1 — Clone the repo
git clone https://github.com/ChrisTheProBoy/EventHub-anglular.git
cd EventHub-anglular

# 2 — Install dependencies
npm install

# 3 — Start the dev server (auto-opens browser)
ng serve -o
```

The app will be available at **http://localhost:4200**

### Mock Authentication
The app uses mock authentication — **any email + a password of 6 or more characters** will log you in successfully. No backend is required.

---

## 🗺 Pages & Routes

| Route | Component | Protected |
|---|---|---|
| `/events` | Event listing with filters | — |
| `/event/:id` | Event detail with tabs | — |
| `/event/:id/schedule` | Schedule timeline *(child)* | — |
| `/event/:id/speakers` | Speaker cards *(child)* | — |
| `/booking/:id` | Book tickets (reactive form) | ✅ `authGuard` |
| `/bookings` | My bookings table | — |
| `/login` | Sign in / Register | — |

---

## 📚 Key Concepts Demonstrated

### TypeScript
- Strongly-typed interfaces: `Event`, `User`, `Booking`, `Speaker`, `ScheduleItem`
- Union types: `BookingStatus`, `UserRole`, `ScheduleItemType`
- Generic types: `Record<string, string>`, `Observable<T>`

### Angular Architecture
- **Standalone components** throughout (no `NgModule`)
- `*ngFor`, `*ngIf`, `[ngStyle]`, `[ngClass]` — all built-in directives
- Custom **structural-style** attribute directives with `Renderer2`
- **Pure pipe** for event filtering
- **Reactive forms** with `FormBuilder`, `Validators`, regex patterns
- **Template-driven form** elements in Login component

### Routing
- Parameterized routes with `ActivatedRoute` + `paramMap`
- **Child routes** for event schedule and speakers
- **Functional `authGuard`** with `returnUrl` query param redirect

### Services & DI
- All services `providedIn: 'root'` — tree-shakeable
- `BehaviorSubject` for reactive auth and booking state
- `shareReplay(1)` to cache the events HTTP response
- Functional **HTTP interceptor** for centralized error handling

### RxJS Operators Used
`switchMap` · `map` · `catchError` · `shareReplay` · `tap` · `delay` · `combineLatest` · `filter`

### Angular Material Components
`MatToolbar` · `MatCard` · `MatTabGroup` · `MatDialog` · `MatTable` · `MatSort` · `MatPaginator` · `MatFormField` · `MatInput` · `MatSelect` · `MatProgressBar` · `MatBadge` · `MatMenu` · `MatSnackBar` · `MatChips` · `MatDivider` · `MatProgressSpinner`

---

## 📄 License

This project was built as a **CIA (Continuous Internal Assessment)** submission.

---

<p align="center">Made with ❤️ using Angular 20 & Angular Material</p>
