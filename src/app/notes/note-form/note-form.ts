import { Component, computed, inject, signal, ViewChild } from '@angular/core';
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
import { NotesService } from '../services/notes-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoteColorInput } from './note-color-input/note-color-input';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'note-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    NoteColorInput,
    MatTooltip
],
  templateUrl: `note-form.html`,
  styleUrl: `note-form.scss`,
})
export class NoteForm {
  notesService = inject(NotesService);

  @ViewChild('formDirective') private formDirective!: FormGroupDirective;
  createNoteForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.maxLength(200)]),
    color: new FormControl('#8FF0A4'),
  });

  images = signal<File[]>([]);
  imagesPreview = computed(() =>
    this.images().map((image) => URL.createObjectURL(image))
  );

  onImagesSelected(event: Event) {
    const images = (event.target as HTMLInputElement).files;
    if (!images) return;

    this.images.set(Array.from(images));
  }

  onColorChange($event: string) {
    this.createNoteForm.get('color')!.setValue($event);
  }

  async onSubmit() {
    this.checkAllFieldsForErrors(this.createNoteForm);

    if (this.createNoteForm.invalid) return;

    await this.notesService.create({
      title: this.createNoteForm.get('title')!.value!,
      content: this.createNoteForm.get('content')!.value,
      color: this.createNoteForm.get('color')!.value,
      images: this.images(),
    });

    this.images.set([]);
    this.formDirective.resetForm();
    this.createNoteForm.reset();
  }

  private checkAllFieldsForErrors(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.checkAllFieldsForErrors(control);
      }
    });
  }
}
