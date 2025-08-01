import { TitleCasePipe } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';

@Component({
  selector: 'auth-text-input',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    TitleCasePipe,
  ],
  template: `
    <mat-form-field class="auth-field">
      <mat-label>{{ name | titlecase }}*</mat-label>
      <input matInput [type]="type" [name]="name" [formControl]="ctrl" />
    </mat-form-field>
  `,
  styles: `
    .auth-field {
      width: 100%;
    }
  `,
})
export class TextInput {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) type!: string;
  @Input({ required: true }) ctrl!: FormControl;
}
