import { Component, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Note } from 'app/notes/services/note.model';
import { NotesService } from 'app/notes/services/notes-service';

@Component({
  selector: 'app-delete',
  imports: [MatIcon, MatIconButton, MatTooltip],
  templateUrl: './delete.html',
  styleUrl: './delete.scss',
})
export class Delete {
  note = input.required<Note>();
  notesService = inject(NotesService);

  deleteNote(event: any) {
    event.stopPropagation();
    this.notesService.delete(this.note());
  }
}
