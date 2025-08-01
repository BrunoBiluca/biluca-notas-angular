import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user-service';
import { Router } from '@angular/router';
import { FormLayout } from '../components/form-layout/form-layout';
import { TextInput } from '../components/text-input/text-input';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonExistingUserValidator } from './username.validator';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    FormLayout,
    TextInput,
    SubmitBtn,
  ],
  template: `
    <auth-form-layout title="Sign Up!">
      <auth-text-input
        name="username"
        type="text"
        [ctrl]="username"
        [error]="usernameError()"
        (onBlur)="updateUsernameError()"
      />
      <auth-text-input
        name="email"
        type="email"
        [ctrl]="email"
        [error]="emailError()"
        (onBlur)="updateEmailError()"
      />
      <auth-text-input
        name="password"
        type="password"
        [ctrl]="password"
        [error]="passwordError()"
        (onBlur)="updatePasswordError()"
      />
      <auth-submit-btn (onSubmit)="submitSignup()" text="Criar" />
    </auth-form-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
  nonExistingUserValidator = inject(NonExistingUserValidator);
  username = new FormControl('', [Validators.required, this.nonExistingUserValidator.check()]);
  usernameError = signal('');
  email = new FormControl('', [Validators.required, Validators.email]);
  emailError = signal('');
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  passwordError = signal('');
  userService = inject(UserService);
  router = inject(Router);

  constructor() {
    merge(this.username.statusChanges, this.username.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateUsernameError());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailError());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordError());
  }

  updateUsernameError() {
    if (this.username.hasError('required')) {
      this.usernameError.set('Nome do usuário não deve ser vazio');
    } else if (this.username.hasError('userExists')) {
      this.username.markAsTouched();
      this.usernameError.set('Nome de usuário já existe');
    } else {
      this.usernameError.set('');
    }
  }

  updateEmailError() {
    if (this.email.hasError('required')) {
      this.emailError.set('Email não deve ser vazio');
    } else if (this.email.hasError('email')) {
      this.emailError.set('Email inválido');
    } else {
      this.emailError.set('');
    }
  }

  updatePasswordError() {
    if (this.password.hasError('required')) {
      this.passwordError.set('Password deve ter pelo menos 6 caracteres');
    } else {
      this.passwordError.set('');
    }
  }

  submitSignup() {
    this.username.markAsTouched();
    this.email.markAsTouched();
    this.password.markAsTouched();

    this.updateUsernameError();
    this.updateEmailError();
    this.updatePasswordError();

    if (this.username.invalid || this.email.invalid || this.password.invalid) {
      return;
    }

    this.userService.create({
      username: this.username.value!,
      email: this.email.value!,
      password: this.password.value!,
    });

    this.router.navigate(['/login']);
  }
}
