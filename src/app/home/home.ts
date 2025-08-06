import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  signal,
  OnInit,
  computed,
  Signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Grid } from 'app/notes/grid/grid';
import { NoteForm } from 'app/notes/note-form/note-form';
import { Note } from 'app/notes/note.model';
import { NotesList } from 'app/notes/notes-list/notes-list';
import { NotesService } from 'app/notes/notes-service';
import { NotesViewModeService } from 'app/notes/notes-view-mode-service';
import { ViewModeSelector } from 'app/notes/view-mode-selector/view-mode-selector';

@Component({
  selector: 'app-home',
  imports: [FormsModule, NoteForm, NotesList, Grid, ViewModeSelector],
  template: `
    <h1>Notas</h1>
    <note-form></note-form>
    <input
      id="search"
      type="text"
      placeholder="Pesquisar..."
      [(ngModel)]="searchTerm"
    />
    <notes-view-mode-selector />
    @if (viewMode() === 'list') {
    <notes-list [notes]="filteredNotes()" (onDelete)="deleteNote($event)" />
    } @else if (viewMode() === 'grid') {
    <notes-grid [notes]="filteredNotes()" />
    }
  `,
  styles: ``,
})
export class Home implements OnInit {
  notes = signal<Note[]>([]);
  searchTerm = signal<string>('');
  filteredNotes: Signal<Note[]> = computed(() => {
    if (this.searchTerm().length < 3) {
      return this.notes();
    }
    
    return this.notes().filter(
      (note) =>
        note.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        note.content?.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  });
  notesService = inject(NotesService);

  viewMode = signal<string>('');
  notesViewModeService = inject(NotesViewModeService);

  ngOnInit(): void {
    this.initViewMode();
    this.initNotes();
  }

  initViewMode() {
    this.notesViewModeService.viewMode$().subscribe((mode) => {
      this.viewMode.set(mode);
    });
  }

  initNotes() {
    this.notesService.getAll();
    this.notesService.notes$().subscribe((notes) => this.notes.set(notes));
  }

  deleteNote(note: Note) {
    this.notesService.delete(note);
  }
}
