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
    const submitBtn = getSubmitBtn(fixture);

    submitBtn.click();
    fixture.detectChanges();

    expect(getUsernameError(fixture)).toBeTruthy();
    expect(getEmailError(fixture)).toBeTruthy();
    expect(getPasswordError(fixture)).toBeTruthy();
  });

  it('should display error message when email is invalid', () => {
    const email = getEmailInput(fixture);
    email.value = 'invalid-email';
    email.dispatchEvent(new Event('input'));

    const submitBtn = getSubmitBtn(fixture);
    submitBtn.click();
    fixture.detectChanges();

    expect(getEmailError(fixture)).toBeTruthy();
  });

  it('should display error message when passwork is incorrect', () => {
    const password = getPassworkInput(fixture);
    password.value = '123';
    password.dispatchEvent(new Event('input'));

    const submitBtn = getSubmitBtn(fixture);
    submitBtn.click();
    fixture.detectChanges();

    expect(getPasswordError(fixture)).toBeTruthy();
  });

  it('should display error message when username already exists', () => {
    const username = getUsernameInput(fixture);
    username.value = 'existing-user';
    username.dispatchEvent(new Event('input'));

    const submitBtn = getSubmitBtn(fixture);
    submitBtn.click();
    fixture.detectChanges();

    expect(getUsernameError(fixture)).toBeTruthy();
  });

  it('should submit valid form and redirect to login', () => {
    const username = getUsernameInput(fixture);
    const email = getEmailInput(fixture);
    const password = getPassworkInput(fixture);

    username.value = 'John Doe';
    username.dispatchEvent(new Event('input'));

    email.value = 'YV2Dp@example.com';
    email.dispatchEvent(new Event('input'));

    password.value = '123456';
    password.dispatchEvent(new Event('input'));

    const submitBtn = getSubmitBtn(fixture);
    submitBtn.click();
    fixture.detectChanges();

    expect(getUsernameError(fixture)).toBeNull();
    expect(getEmailError(fixture)).toBeNull();
    expect(getPasswordError(fixture)).toBeNull();
  });
});

function getPasswordError(fixture: ComponentFixture<Signup>) {
  return fixture.nativeElement.querySelector('span[id="password-error"]');
}

function getEmailError(fixture: ComponentFixture<Signup>) {
  return fixture.nativeElement.querySelector('span[id="email-error"]');
}

function getUsernameError(fixture: ComponentFixture<Signup>) {
  return fixture.nativeElement.querySelector('span[id="username-error"]');
}

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

