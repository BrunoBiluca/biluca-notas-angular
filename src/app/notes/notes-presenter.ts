import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Note } from './services/note.model';
import { Router } from '@angular/router';

@Component({
  template: '',
})
export abstract class NotesPresenter {
  router = inject(Router);

  @Input() notes: Note[] = [];

  @Output() onTogglePin = new EventEmitter<Note>();
  @Output() onDelete = new EventEmitter<Note>();

  pinnedNotes = () => this.notes.filter((note) => note.isPinned);
  otherNotes = () => this.notes.filter((note) => !note.isPinned);

  goToNoteDetail(note: Note) {
    this.router.navigate(['/notes', note.id]);
  }

  getStyleByColor(note: Note) {
    return note.color === null ||
      note.color === 'white' ||
      note.color === '#ffffff' ||
      note.color === 'rgb(255, 255, 255)'
      ? 'border: 1px solid #868686'
      : 'background-color: ' + note.color + '; border: 1px solid ' + note.color;
  }
}
