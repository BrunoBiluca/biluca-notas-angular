import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Note } from 'app/notes/services/note.model';
import { NotesService } from 'app/notes/services/notes-service';

@Component({
  selector: 'app-toggle-pin',
  imports: [CommonModule, MatIcon, MatIconButton, MatTooltip],
  templateUrl: './toggle-pin.html',
  styleUrl: './toggle-pin.scss',
})
export class TogglePin {
  note = input.required<Note>();
  notesService = inject(NotesService);

  togglePin(event: any) {
    event.stopPropagation();
    this.notesService.update(this.note().id, {
      isPinned: !this.note().isPinned,
    });
  }
}
