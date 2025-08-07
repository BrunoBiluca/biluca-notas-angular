import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Note } from '../note.model';
import { CommonModule } from '@angular/common';
import { NotesService } from '../notes-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li
        *ngFor="let note of getPinnedNotes()"
        class="note-item pinned"
        style="background-color: {{ note.color }}"
        (click)="goToNoteDetail(note)"
      >
        <span class="pin-icon">📌</span>
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>
        <p>{{ note.created_at | date : 'dd/MM/yyyy' }}</p>
        <button (click)="togglePin(note)">UnPin</button>
        <button (click)="onDelete.emit(note)">delete</button>
      </li>
      <li
        *ngFor="let note of getGeneralNotes()"
        class="note-item"
        style="background-color: {{ note.color }}"
        (click)="goToNoteDetail(note)"
      >
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>
        <p>{{ note.created_at | date : 'dd/MM/yyyy' }}</p>
        <button (click)="togglePin(note)">Pin</button>
        <button (click)="onDelete.emit(note)">Delete</button>
      </li>
    </ul>
  `,
})
export class NotesList {
  @Input() notes: Note[] = [];
  @Output() onDelete = new EventEmitter<Note>();
  notesService = inject(NotesService);
  router = inject(Router);

  togglePin(note: Note) {
    note.isPinned = !note.isPinned;
    this.notesService.update(note.id, {
      isPinned: note.isPinned,
    });
  }

  goToNoteDetail(note: Note) {
    this.router.navigate(['/notes', note.id]);
  }

  getPinnedNotes(): Note[] {
    return this.notes.filter((note) => note.isPinned);
  }

  getGeneralNotes(): Note[] {
    return this.notes.filter((note) => !note.isPinned);
  }
}
