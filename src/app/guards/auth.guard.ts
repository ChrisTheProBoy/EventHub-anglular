import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    }

    // Store intended URL for redirect after login
    const eventId = route.paramMap.get('id');
    const returnUrl = eventId ? `/booking/${eventId}` : '/events';
    return router.createUrlTree(['/login'], { queryParams: { returnUrl } });
};
