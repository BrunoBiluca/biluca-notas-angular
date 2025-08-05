import { Component, inject, signal, OnInit } from '@angular/core';
import { Grid } from 'app/notes/grid/grid';
import { NoteForm } from 'app/notes/note-form/note-form';
import { Note } from 'app/notes/note.model';
import { NotesList } from 'app/notes/notes-list/notes-list';
import { NotesService } from 'app/notes/notes-service';
import { NotesViewModeService } from 'app/notes/notes-view-mode-service';
import { ViewModeSelector } from 'app/notes/view-mode-selector/view-mode-selector';

@Component({
  selector: 'app-home',
  imports: [NoteForm, NotesList, Grid, ViewModeSelector],
  template: `
    <h1>Notas</h1>
    <note-form></note-form>
    <notes-view-mode-selector />
    @if (viewMode() === 'list') {
    <notes-list [notes]="notes()" />

    } @else if (viewMode() === 'grid') {
    <notes-grid [notes]="notes()" />
    }
  `,
  styles: ``,
})
export class Home implements OnInit {
  notes = signal<Note[]>([]);
  notesService = inject(NotesService);

  viewMode = signal<string>('');
  notesViewModeService = inject(NotesViewModeService);

  ngOnInit(): void {
    this.notesService.getAll();
    this.notesService.notes$.subscribe((notes) => this.notes.set(notes));

    this.notesViewModeService.viewMode$.subscribe((mode) => {
      this.viewMode.set(mode);
    });
  }
}
