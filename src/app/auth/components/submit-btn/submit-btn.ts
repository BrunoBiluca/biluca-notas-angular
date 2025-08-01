import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'auth-submit-btn',
  imports: [MatButton],
  template: `
    <button
      type="submit"
      (click)="handleClick()"
      matButton="filled"
      class="auth-submit"
    >
      Continuar
    </button>
  `,
  styles: `
    .auth-submit {
      margin-top: 1em;
      width: 100%;
    }
  `,
})
export class SubmitBtn {
  onSubmit = output<void>();

  handleClick() {
    this.onSubmit.emit();
  }
}
