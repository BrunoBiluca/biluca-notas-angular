import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-layout',
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: `
    .container {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .content {
      width: 400px;
    }
  `,
})
export class Layout {}
