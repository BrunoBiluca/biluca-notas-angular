import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth-guard';
import { UserService } from './user-service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let userService = jasmine.createSpyObj('UserService', ['isLoggedIn']);

  beforeEach(async () => {
    userService.isLoggedIn.and.callFake(() => false);

    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: userService }],
    });
  });

  it('should guard against unauthenticated users', async () => {
    const route: any = {};
    const state: any = {};
    const result = await executeGuard(route, state);
    expect(result).toBeFalse();
  });

  it('should pass guard for authenticated users', async () => {
    userService.isLoggedIn.and.callFake(() => true);
    const route: any = {};
    const state: any = {};
    const result = await executeGuard(route, state);
    expect(result).toBeTrue();
  });
});
