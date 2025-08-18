import { Component } from '@angular/core';
import { Logout } from "app/auth/logout/logout";

@Component({
  selector: 'app-header',
  imports: [Logout],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {}
