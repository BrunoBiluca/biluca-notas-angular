import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Note } from 'app/notes/note.model';

@Component({
  selector: 'item',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class Item {
  @Input() note!: Note;
  @Output() onDelete = new EventEmitter<Note>();
  @Output() onTogglePin = new EventEmitter<Note>();

  router = inject(Router);

  handleTogglePin(event: Event, note: Note) {
    event.stopPropagation();
    this.onTogglePin.emit(note);
  }

  handleDelete(event: Event, note: Note) {
    event.stopPropagation();
    this.onDelete.emit(note);
  }

  goToNoteDetail(note: Note) {
    this.router.navigate(['/notes', note.id]);
  }
}
