import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoteSearch } from '../services/note-search';

@Component({
  selector: 'notes-search',
  imports: [FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  searchTerm = signal<string>('');
  noteSearch = inject(NoteSearch);

  updateGlobally() {
    this.noteSearch.update(this.searchTerm());
  }

  clear() {
    this.searchTerm.set('');
    this.updateGlobally();
  }
}
