import { Component } from '@angular/core';
import { AppHeader } from '../app-header/app-header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [AppHeader, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: 'layout.scss',
})
export class Layout {}
