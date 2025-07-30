import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from './user-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) : boolean | UrlTree => {
  const isLoggedIn = inject(UserService).isLoggedIn();
  const isAuthPage = ['/login', '/signup'].includes(state.url);
  const router = inject(Router);

  if (isLoggedIn && isAuthPage) {
    return router.createUrlTree(['/notes']);
  }

  if (!isLoggedIn && !isAuthPage) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
