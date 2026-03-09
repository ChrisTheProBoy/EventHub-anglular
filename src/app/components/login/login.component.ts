import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, RouterModule,
        MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
        MatIconModule, MatTabsModule, MatProgressSpinnerModule, MatSnackBarModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    registerForm!: FormGroup;
    isLoading = false;
    isSubmitted = false;
    hidePassword = true;
    returnUrl = '/events';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/events';
        if (this.authService.isLoggedIn()) {
            this.router.navigate([this.returnUrl]);
        }
        this.initForms();
    }

    private initForms(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.pattern(/^\+?[\d\s\-()]{7,15}$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get lf() { return this.loginForm.controls; }
    get rf() { return this.registerForm.controls; }

    onLogin(): void {
        this.isSubmitted = true;
        if (this.loginForm.invalid) return;
        this.isLoading = true;
        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                this.snackBar.open('Welcome back!', 'Close', { duration: 3000 });
                this.router.navigate([this.returnUrl]);
            },
            error: () => { this.isLoading = false; }
        });
    }

    onRegister(): void {
        this.isSubmitted = true;
        if (this.registerForm.invalid) return;
        this.isLoading = true;
        this.authService.register(this.registerForm.value).subscribe({
            next: (user) => {
                this.snackBar.open(`Welcome, ${user.firstName}!`, 'Close', { duration: 3000 });
                this.router.navigate([this.returnUrl]);
            },
            error: () => { this.isLoading = false; }
        });
    }
}
