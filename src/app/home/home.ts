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
import { Note } from 'app/notes/services/note.model';
import { NotesList } from 'app/notes/notes-list/notes-list';
import { NotesService } from 'app/notes/services/notes-service';
import { NotesViewModeService } from 'app/notes/services/notes-view-mode-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    NoteForm,
    NotesList,
    Grid,
    RouterModule
],
  templateUrl: `./home.html`,
  styleUrl: `./home.scss`,
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
