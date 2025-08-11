import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Note } from '../note.model';
import { CommonModule } from '@angular/common';
import { NotesService } from '../notes-service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Item } from './item/item';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, Item],
  template: `
    <h3>{{ 'Fixadas' | uppercase }}</h3>
    <ul id="pinned-notes" class="notes-list">
      @for(note of getPinnedNotes(); track note.id) {
      <item
        [note]="note"
        (onDelete)="onDelete.emit($event)"
        (onTogglePin)="togglePin($event)"
      ></item>
      }
    </ul>
    <h3>{{ 'Outras' | uppercase }}</h3>
    <ul id="other-notes" class="notes-list">
      @for(note of getGeneralNotes(); track note.id) {
      <item
        [note]="note"
        (onDelete)="onDelete.emit($event)"
        (onTogglePin)="togglePin($event)"
      ></item>
      }
    </ul>
  `,
  styleUrl: './notes-list.scss',
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

  getPinnedNotes(): Note[] {
    return this.notes.filter((note) => note.isPinned);
  }

  getGeneralNotes(): Note[] {
    return this.notes.filter((note) => !note.isPinned);
  }
}
