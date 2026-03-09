import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, LoginCredentials, RegisterData } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly STORAGE_KEY = 'auth_user';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        this.loadUserFromStorage();
    }

    private loadUserFromStorage(): void {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            this.currentUserSubject.next(JSON.parse(stored));
        }
    }

    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    isLoggedIn(): boolean {
        return this.currentUserSubject.value !== null;
    }

    login(credentials: LoginCredentials): Observable<User> {
        // Mock authentication – always succeeds after a brief delay
        const user: User = {
            id: 'usr-' + Date.now(),
            firstName: credentials.email.split('@')[0],
            lastName: 'User',
            email: credentials.email,
            role: 'user',
            createdAt: new Date().toISOString()
        };
        return of(user).pipe(
            delay(800),
            tap(u => {
                this.currentUserSubject.next(u);
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(u));
            })
        );
    }

    register(data: RegisterData): Observable<User> {
        const user: User = {
            id: 'usr-' + Date.now(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            role: 'user',
            createdAt: new Date().toISOString()
        };
        return of(user).pipe(
            delay(800),
            tap(u => {
                this.currentUserSubject.next(u);
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(u));
            })
        );
    }

    logout(): void {
        this.currentUserSubject.next(null);
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
