import { Component, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import { NotesService } from '../notes-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'note-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    CommonModule,
  ],
  template: `
    <form
      class="note-form"
      [formGroup]="createNoteForm"
      #formDirective="ngForm"
      (ngSubmit)="onSubmit()"
    >
      <h1>Nova nota</h1>
      <mat-form-field>
        <mat-label for="title">Title</mat-label>
        <input matInput type="text" formControlName="title" id="title" />
        @if(createNoteForm.get('title')!.invalid) {
        <mat-error *ngIf="createNoteForm.get('title')!.errors?.['required']">
          Título é obrigatorio
        </mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label for="content">Content</mat-label>
        <textarea matInput formControlName="content" id="content"></textarea>
        @if(createNoteForm.get('content')!.invalid) {
        <mat-error
          *ngIf="createNoteForm.get('content')!.errors?.['maxlength']"
          id="content-error"
        >
          O conteúdo deve ter no máximo 200 caracteres.
        </mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label for="color">Color</mat-label>
        <input matInput type="color" formControlName="color" id="color" />
      </mat-form-field>
      <button type="submit" [disabled]="createNoteForm.invalid">Criar</button>
    </form>
  `,
  styles: `
    .note-form {
      display: flex;
      flex-direction: column;
      width: 50%;
      margin: 0 auto;
    }
  `,
})
export class NoteForm {
  @ViewChild('formDirective') private formDirective!: FormGroupDirective;
  createNoteForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.maxLength(200)]),
    color: new FormControl('#8FF0A4'),
  });
  notesService = inject(NotesService);

  onSubmit() {
    console.log(this.createNoteForm.get('content')!.errors);
    this.markFormGroupTouched(this.createNoteForm);

    if (this.createNoteForm.invalid) {
      return;
    }

    this.notesService.create({
      title: this.createNoteForm.get('title')!.value!,
      content: this.createNoteForm.get('content')!.value,
      color: this.createNoteForm.get('color')!.value,
    });

    this.formDirective.resetForm();
    this.createNoteForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
