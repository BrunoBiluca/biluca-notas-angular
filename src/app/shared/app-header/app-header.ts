import { Component } from '@angular/core';
import { Logout } from 'app/auth/logout/logout';
import { ViewModeSelector } from 'app/notes/view-mode-selector/view-mode-selector';
import { Search } from 'app/notes/search/search';

@Component({
  selector: 'app-header',
  imports: [Logout, ViewModeSelector, Search],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {}
