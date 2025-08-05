import { Injectable } from '@angular/core';
import { NoteCreateParams } from './note-create-params.model';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  getAll(): Note[] {
    const notes: Note[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('note_')) {
        const note = JSON.parse(localStorage.getItem(key)!) as Note;
        notes.push(note);
      }
    }
    return notes;
  }

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
