import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService, UserNotFoundError } from '../user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <h1>Que bom que você voltou</h1>
    <fieldset>
      <input
        type="text"
        name="username"
        placeholder="Username"
        [formControl]="username"
      />
    </fieldset>
    <fieldset>
      <input
        type="password"
        name="password"
        placeholder="Password"
        [formControl]="password"
      />
    </fieldset>
    @if(loginError()){
    <span id="login-error" class="error-message">{{ loginError() }}</span>
    }
    <button type="submit" (click)="submitLogin()">Continuar</button>
  `,
})
export class Login {
  username = new FormControl('');
  password = new FormControl('');
  loginError = signal('');
  userService = inject(UserService);
  router = inject(Router);

  submitLogin() {
    this.loginError.set('');
    if (this.username.value === '') {
      this.loginError.set('Username nao deve ser vazio');
    }

    if (this.password.value === '') {
      this.loginError.set('Password nao deve ser vazio');
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
    }
    catch(UserNotFoundError) {
      this.loginError.set('Usuário não existe.');
      return;
    }
    this.router.navigate(['/notes']);
  }
}
