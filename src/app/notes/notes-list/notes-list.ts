import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Note } from '../services/note.model';
import { CommonModule } from '@angular/common';
import { NotesService } from '../services/notes-service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Item } from './item/item';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, Item],
  templateUrl: './notes-list.html',
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
