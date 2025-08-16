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
  template: `
    <mat-card
      appearance="outlined"
      class="note-item"
      [style]="note.color === null ? 'border: 1px solid #868686' : 'background-color: ' + note.color"
      (click)="goToNoteDetail(note)"
    >
      <mat-card-header class="note-header">
        <mat-card-title>
          {{ note.title }}
        </mat-card-title>
        <button matIconButton (click)="handleTogglePin($event, note)">
          @if(note.isPinned) {
          <mat-icon>push_pin</mat-icon>
          } @else {
          <span class="material-icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
            >
              <g><rect fill="none" height="24" width="24" /></g>
              <g>
                <path
                  d="M14,4v5c0,1.12,0.37,2.16,1,3H9c0.65-0.86,1-1.9,1-3V4H14 M17,2H7C6.45,2,6,2.45,6,3c0,0.55,0.45,1,1,1c0,0,0,0,0,0l1,0v5 c0,1.66-1.34,3-3,3v2h5.97v7l1,1l1-1v-7H19v-2c0,0,0,0,0,0c-1.66,0-3-1.34-3-3V4l1,0c0,0,0,0,0,0c0.55,0,1-0.45,1-1 C18,2.45,17.55,2,17,2L17,2z"
                />
              </g>
            </svg>
          </span>
          }
        </button>
      </mat-card-header>
      <mat-card-content>{{ note.content }}</mat-card-content>
      <mat-card-footer class="note-footer">
        <span>
          {{ note.created_at | date : 'dd/MM/yyyy' }}
        </span>
        <div>
          <button (click)="handleDelete($event, note)">delete</button>
        </div>
      </mat-card-footer>
    </mat-card>
  `,
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
