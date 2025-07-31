import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { provideRouter, Router } from '@angular/router';
import { UserNotFoundError, UserService } from '../user-service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let router: Router;
  let userService = jasmine.createSpyObj('UserService', ['login']);

  beforeEach(async () => {
    (userService.login as jasmine.Spy).and.callFake(
      (username: string, password: string) =>
        username === 'existing-user' && password === '123456'
    );

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should display main components', () => {
    expect(getUsernameInput(fixture)).toBeTruthy();
    expect(getPasswordInput(fixture)).toBeTruthy();
    expect(getSubmitBtn(fixture)).toBeTruthy();
  });

  it('should display error message when any field is empty', () => {
    const submitBtn = getSubmitBtn(fixture);
    submitBtn.click();
    fixture.detectChanges();

    expect(getLoginError(fixture)).toBeTruthy();
  });

  it('should display error message when user does not exist', () => {
    (userService.login as jasmine.Spy).and.callFake(
      (_username: string, _password: string) => {
        throw new UserNotFoundError();
      }
    );

    const username = getUsernameInput(fixture);
    username.value = 'non-existing-user';
    username.dispatchEvent(new Event('input'));

    const password = getPasswordInput(fixture);
    password.value = '123456';
    password.dispatchEvent(new Event('input'));

    const submitBtn = getSubmitBtn(fixture);
    submitBtn.click();
    fixture.detectChanges();

    expect(getLoginError(fixture)).toBeTruthy();
    expect(getLoginError(fixture).textContent).toContain('Usuário não existe.');
  });

  it('should successfully login', () => {
    const username = getUsernameInput(fixture);
    const password = getPasswordInput(fixture);

    username.value = 'existing-user';
    username.dispatchEvent(new Event('input'));

    password.value = '123456';
    password.dispatchEvent(new Event('input'));

    const submitBtn = getSubmitBtn(fixture);
    submitBtn.click();
    fixture.detectChanges();

    expect(getLoginError(fixture)).toBeNull();

    expect(component.router.navigate).toHaveBeenCalledWith(['/notes']);
  });
});

function getSubmitBtn(fixture: ComponentFixture<Login>): any {
  return fixture.nativeElement.querySelector('button[type="submit"]');
}

function getPasswordInput(fixture: ComponentFixture<Login>): any {
  return fixture.nativeElement.querySelector('input[name="password"]');
}

function getUsernameInput(fixture: ComponentFixture<Login>): any {
  return fixture.nativeElement.querySelector('input[name="username"]');
}

function getLoginError(fixture: ComponentFixture<Login>): any {
  return fixture.nativeElement.querySelector('span[id="login-error"]');
}
