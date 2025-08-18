import { Component, inject } from '@angular/core';
import { UserService } from '../user-service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logout',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button matButton (click)="logout()" class="logout">
      <mat-icon>logout</mat-icon> 
      <span>Sair</span>
    </button>
  `,
  styles: `
    .mat-mdc-button.logout {
      color: black;
    }
  `
})
export class Logout {
  userService = inject(UserService);
  router = inject(Router);
  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
