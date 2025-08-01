import { Component } from '@angular/core';
import { Logout } from "app/auth/logout/logout";

@Component({
  selector: 'app-header',
  imports: [Logout],
  template: `
  <app-logout />
  `,
  styles: '',
})
export class AppHeader {}
