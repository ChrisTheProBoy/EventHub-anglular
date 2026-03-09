import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred.';
      if (error.status === 0) {
        message = 'Network error: Please check your connection.';
      } else if (error.status === 404) {
        message = 'Requested resource not found.';
      } else if (error.status >= 500) {
        message = 'Server error. Please try again later.';
      } else if (error.error?.message) {
        message = error.error.message;
      }
      console.error('[HTTP Error]', error);
      snackBar.open(message, 'Dismiss', { duration: 5000, panelClass: 'error-snack' });
      return throwError(() => new Error(message));
    })
  );
};
