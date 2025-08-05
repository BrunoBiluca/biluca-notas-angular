import { Component, inject, signal, OnInit } from '@angular/core';
import { NoteForm } from 'app/notes/note-form/note-form';
import { Note } from 'app/notes/note.model';
import { NotesList } from 'app/notes/notes-list/notes-list';
import { NotesService } from 'app/notes/notes-service';
import { ViewModeSelector } from "app/notes/view-mode-selector/view-mode-selector";

@Component({
  selector: 'app-home',
  imports: [NoteForm, NotesList, ViewModeSelector],
  template: `
    <h1>Notas</h1>
    <note-form></note-form>
    <notes-view-mode-selector />
    <notes-list [notes]="notes()" />
  `,
  styles: ``,
})
export class Home implements OnInit {
  notes = signal<Note[]>([]);
  notesService = inject(NotesService);

  ngOnInit(): void {
    this.notesService.getAll();
    this.notesService.notes$.subscribe((notes) => this.notes.set(notes));
  }
}
