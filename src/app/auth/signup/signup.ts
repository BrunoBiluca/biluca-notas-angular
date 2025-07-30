import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import emailValidator from 'common/emailValidator';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  template: `
    <h1>Sign Up!</h1>
    <fieldset>
      <input
        type="text"
        name="username"
        placeholder="Username"
        [formControl]="username"
      />
      @if(usernameError()) {
      <span id="username-error" class="error-message">{{
        usernameError()
      }}</span>
      }
    </fieldset>
    <fieldset>
      <input
        type="text"
        name="email"
        placeholder="Email"
        [formControl]="email"
      />
      @if(emailError()) {
      <span id="email-error" class="error-message">{{ emailError() }}</span>
      }
    </fieldset>
    <fieldset>
      <input
        type="password"
        name="password"
        placeholder="Password"
        [formControl]="password"
      />
      @if(passwordError()){
      <span id="password-error" class="error-message">{{
        passwordError()
      }}</span>
      }
    </fieldset>
    <button type="submit" (click)="submitSignup()">Criar</button>
  `,
})
export class Signup {
  username = new FormControl('');
  usernameError = signal('');
  email = new FormControl('');
  emailError = signal('');
  password = new FormControl('');
  passwordError = signal('');

  submitSignup() {
    this.usernameError.set('');
    this.emailError.set('');
    this.passwordError.set('');

    if (this.username.value === '') {
      this.usernameError.set('Nome do usuário não deve ser vazio');
    }

    if (this.email.value === '') {
      this.emailError.set('Email não deve ser vazio');
    }

    if (!emailValidator(this.email.value!)) {
      this.emailError.set('Email inválido');
    }

    if (this.password.value === '') {
      this.passwordError.set('Password não deve ser vazio');
    }
  }
}
