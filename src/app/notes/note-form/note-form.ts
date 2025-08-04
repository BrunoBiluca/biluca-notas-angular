import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import { NotesService } from '../notes-service';

@Component({
  selector: 'note-form',
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInputModule],
  template: `
    <form [formGroup]="createNoteForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label for="title">Title</mat-label>
        <input matInput type="text" formControlName="title" id="title" />
      </mat-form-field>
      <mat-form-field>
        <mat-label for="content">Content</mat-label>
        <textarea matInput formControlName="content" id="content"></textarea>
      </mat-form-field>
      <mat-form-field>
        <mat-label for="color">Color</mat-label>
        <input matInput type="color" formControlName="color" id="color" />
      </mat-form-field>
      <button type="submit" [disabled]="createNoteForm.invalid">Criar</button>
    </form>
  `,
})
export class NoteForm {
  createNoteForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl(''),
    color: new FormControl('#8FF0A4'),
  });
  notesService = inject(NotesService);

  onSubmit() {
    if (this.createNoteForm.invalid) {
      return;
    }

    this.notesService.create({
      title: this.createNoteForm.get('title')!.value!,
      content: this.createNoteForm.get('content')!.value,
      color: this.createNoteForm.get('color')!.value,
    });
    this.createNoteForm.reset();
  }
}
