import { Injectable } from '@angular/core';
import { NoteCreateParams } from './note-create-params.model';
import { Note } from './note.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private notes: Note[] = [];

  notes$ = (): Observable<Note[]> => this.notesSubject.asObservable();

  getAll(): Note[] {
    const notes: Note[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('note_')) {
        const note = JSON.parse(localStorage.getItem(key)!) as Note;
        notes.push(note);
      }
    }
    this.notes.push(...notes);
    this.notesSubject.next(this.notes);
    return notes;
  }

  create(note: NoteCreateParams) {
    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 9),
      created_at: new Date(),
      updated_at: new Date(),
      user: 'bruno',
      ...note,
    };
    localStorage.setItem('note_' + newNote.id, JSON.stringify(newNote));

    this.notes.push(newNote);
    this.notesSubject.next(this.notes);
    return newNote;
  }

  update(id: string, updatedValues: Partial<Note>): Note {
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      throw new Error('Note not found');
    }

    const updatedNote = { ...note, ...updatedValues, updated_at: new Date() };
    localStorage.setItem('note_' + id, JSON.stringify(updatedNote));
    return updatedNote;
  }

  delete(note: Note): Note {
    localStorage.removeItem('note_' + note.id);
    this.notes = this.notes.filter((n) => n.id !== note.id);
    this.notesSubject.next(this.notes);
    return note;
  }
}
