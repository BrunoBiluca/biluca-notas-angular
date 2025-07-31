import { Component, inject } from '@angular/core';
import { UserService } from '../user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  template: `
    <button (click)="logout()">Logout</button>
  `
})
export class Logout {
  userService = inject(UserService);
  router = inject(Router)
  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
