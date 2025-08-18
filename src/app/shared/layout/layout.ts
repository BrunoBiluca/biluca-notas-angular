import { Component } from '@angular/core';
import { AppHeader } from '../app-header/app-header';
import { AppFooter } from '../app-footer/app-footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [AppHeader, AppFooter, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: 'layout.scss',
})
export class Layout {}
