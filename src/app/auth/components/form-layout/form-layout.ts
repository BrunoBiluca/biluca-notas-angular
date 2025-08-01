import { Component, input } from '@angular/core';

@Component({
  selector: 'auth-form-layout',
  imports: [],
  template: `
    <h1 class="auth-title">{{ title() }}</h1>
    <div class="auth-form">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .auth-title {
      text-align: center;
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 2em;
    }

    .auth-form {
      padding: 1em;
    }
    `,
})
export class FormLayout {
  title = input<string>();
}
