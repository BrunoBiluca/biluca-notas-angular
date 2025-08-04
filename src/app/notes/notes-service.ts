import { Injectable } from '@angular/core';
import { NoteCreateParams } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  create(note: NoteCreateParams) {
    const newNote = {
      id: Math.random().toString(36).substring(2, 9),
      created_at: new Date(),
      updated_at: new Date(),
      user: 'bruno',
      ...note,
    };
    localStorage.setItem('note_' + newNote.id, JSON.stringify(newNote));

    return newNote;
  }
}
