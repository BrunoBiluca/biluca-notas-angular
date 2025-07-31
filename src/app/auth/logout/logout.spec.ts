import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logout } from './logout';
import { provideRouter, Router } from '@angular/router';
import { UserService } from '../user-service';

describe('Logout', () => {
  let component: Logout;
  let fixture: ComponentFixture<Logout>;
  let router: Router;
  let userService = jasmine.createSpyObj('UserService', ['logout']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logout],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Logout);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    const logoutBtn = fixture.nativeElement.querySelector('button');;
    logoutBtn.click();
    fixture.detectChanges();

    expect(userService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
