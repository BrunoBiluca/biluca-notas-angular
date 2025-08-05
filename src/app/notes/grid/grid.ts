import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Note } from '../note.model';

@Component({
  selector: 'notes-grid',
  imports: [CommonModule, MatGridListModule],
  template: `
    <mat-grid-list cols="3" rowHeight="1:1">
      <mat-grid-tile *ngFor="let n of notes" class="note-item" style="background-color: {{ n.color }};">
        <h3>{{ n.title }}</h3>
        <p>{{ n.content }}</p>
        <p>{{ n.created_at | date : 'dd/MM/yyyy' }}</p>
      </mat-grid-tile>
    </mat-grid-list>
  `,
})
export class Grid {
  @Input() notes: Note[] = [];
}
