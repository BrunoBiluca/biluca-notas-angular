import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { authGuard } from './auth-guard';
import { UserService } from './user-service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let userService = jasmine.createSpyObj('UserService', ['isLoggedIn']);
  let router: Router;

  beforeEach(async () => {
    userService.isLoggedIn.and.callFake(() => false);

    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: userService }],
    });

    router = TestBed.inject(Router);
    spyOn(router, 'createUrlTree');
  });

  it('should guard against unauthenticated users and redirect to login', async () => {
    const route: any = {};
    const state: any = {};
    const result = await executeGuard(route, state);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result instanceof UrlTree).toBeFalse();
  });

  it('should pass guard for authenticated users', async () => {
    userService.isLoggedIn.and.callFake(() => true);
    const route: any = {};
    const state: any = { url: '/login' };
    const result = await executeGuard(route, state);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/notes']);
    expect(result instanceof UrlTree).toBeFalse();
  });
});
