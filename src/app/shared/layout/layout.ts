import { Component } from '@angular/core';
import { AppHeader } from "../app-header/app-header";
import { AppFooter } from "../app-footer/app-footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [AppHeader, AppFooter, RouterOutlet],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: ''
})
export class Layout {

}
