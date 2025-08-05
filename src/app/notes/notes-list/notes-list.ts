import { Component, Input } from '@angular/core';
import { Note } from '../note.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li
        *ngFor="let note of notes"
        class="note-item"
        style="background-color: {{ note.color }}"
      >
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>
        <p>{{ note.created_at | date : 'dd/MM/yyyy' }}</p>
      </li>
    </ul>
  `,
})
export class NotesList {
  @Input() notes: Note[] = [];
}
