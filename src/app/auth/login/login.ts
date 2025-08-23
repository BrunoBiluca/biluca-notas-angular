import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService, UserNotFoundError } from '../user-service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextInput } from '../components/text-input/text-input';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { FormLayout } from '../components/form-layout/form-layout';
import { AUTH_CONFIG } from '../auth-config';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TextInput,
    SubmitBtn,
    FormLayout,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  username = new FormControl('');
  password = new FormControl('');
  loginError = signal('');
  userService = inject(UserService);
  router = inject(Router);
  config = inject(AUTH_CONFIG);

  submitLogin() {
    this.loginError.set('');
    if (this.username.value === '') {
      this.loginError.set('Username não deve ser vazio');
    }

    if (this.password.value === '') {
      this.loginError.set('Password não deve ser vazio');
    }

    if (this.loginError()) {
      return;
    }

    try {
      const isLogged = this.userService.login(
        this.username.value!,
        this.password.value!
      );
      if (!isLogged) {
        this.loginError.set('Username ou password incorretos');
        return;
      }
    } catch (UserNotFoundError) {
      this.loginError.set('Usuário não existe.');
      return;
    }
    this.router.navigate([this.config.redirectAfterLogin]);
  }

  redirectToSignup() {
    this.router.navigate(['/signup'], {
      queryParams: { username: this.username.value },
    });
  }
}
