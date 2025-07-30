import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup } from './signup';
import { By } from '@angular/platform-browser';
import { UserService } from '../user-service';

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;
  let users: UserService;

  beforeEach(async () => {
    users = jasmine.createSpyObj('UserService', ['exists', 'create']);
    (users.exists as jasmine.Spy).and.callFake((username: string) => username === 'existing-user');

    await TestBed.configureTestingModule({
      imports: [Signup],
      providers: [{ provide: UserService, useValue: users }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create main elements', () => {
    const title = By.css("h1");
    const username = getUsernameInput(fixture);
    const email = getEmailInput(fixture);
    const password = getPassworkInput(fixture);
    const submitBtn = getSubmitBtn(fixture);

    expect(title).toBeTruthy()
    expect(username).toBeTruthy()
    expect(email).toBeTruthy()
    expect(password).toBeTruthy()
    expect(submitBtn).toBeTruthy();
  });

  it('should display error message when any field is empty', () => {
    const submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');

    submitBtn.click();
    fixture.detectChanges();

    const usernameError = fixture.nativeElement.querySelector('span[id="username-error"]');
    const emailError = fixture.nativeElement.querySelector('span[id="email-error"]');
    const passwordError = fixture.nativeElement.querySelector('span[id="password-error"]');

    expect(usernameError).toBeTruthy();
    expect(emailError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });

  it('should display error message when email is invalid', () => {
    const email = fixture.nativeElement.querySelector("input[name='email']");
    email.value = 'invalid-email';
    email.dispatchEvent(new Event('input'));

    const submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    fixture.detectChanges();

    const emailError = fixture.nativeElement.querySelector('span[id="email-error"]');
    expect(emailError).toBeTruthy();
  });

  it('should display error message when passwork is incorrect', () => {
    const password = fixture.nativeElement.querySelector("input[name='password']");
    password.value = '123';
    password.dispatchEvent(new Event('input'));

    const submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    fixture.detectChanges();

    const passwordError = fixture.nativeElement.querySelector('span[id="password-error"]');
    expect(passwordError).toBeTruthy();
  });

  it('should display error message when username already exists', () => {
    const username = fixture.nativeElement.querySelector("input[name='username']");
    username.value = 'existing-user';
    username.dispatchEvent(new Event('input'));

    const submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    fixture.detectChanges();

    const usernameError = fixture.nativeElement.querySelector('span[id="username-error"]');
    expect(usernameError).toBeTruthy();
  });

  it('should submit valid form and redirect to login', () => {
    const username = fixture.nativeElement.querySelector("input[name='username']");
    const email = fixture.nativeElement.querySelector("input[name='email']");
    const password = fixture.nativeElement.querySelector("input[name='password']");

    username.value = 'John Doe';
    username.dispatchEvent(new Event('input'));

    email.value = 'YV2Dp@example.com';
    email.dispatchEvent(new Event('input'));

    password.value = '123456';
    password.dispatchEvent(new Event('input'));

    const submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    fixture.detectChanges();

    const usernameError = fixture.nativeElement.querySelector('span[id="username-error"]');
    const emailError = fixture.nativeElement.querySelector('span[id="email-error"]');
    const passwordError = fixture.nativeElement.querySelector('span[id="password-error"]');
    expect(usernameError).toBeNull();
    expect(emailError).toBeNull();
    expect(passwordError).toBeNull();
  });
});

function getSubmitBtn(fixture: ComponentFixture<Signup>) {
  return fixture.nativeElement.querySelector('button[type="submit"]');
}

function getPassworkInput(fixture: ComponentFixture<Signup>) {
  return fixture.nativeElement.querySelector("input[name='password']");
}

function getEmailInput(fixture: ComponentFixture<Signup>) {
  return fixture.nativeElement.querySelector("input[name='email']");
}

function getUsernameInput(fixture: ComponentFixture<Signup>) {
  return fixture.nativeElement.querySelector("input[name='username']");
}

