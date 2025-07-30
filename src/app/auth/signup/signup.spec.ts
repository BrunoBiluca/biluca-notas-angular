import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup } from './signup';
import { By } from '@angular/platform-browser';

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signup]
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
    const username = fixture.nativeElement.querySelector("input[name='username']");
    const email = fixture.nativeElement.querySelector("input[name='email']");
    const password = fixture.nativeElement.querySelector("input[name='password']");
    const submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');

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
});
