import { inject, Injectable } from '@angular/core';
import { NoteCreateParams } from './note-create-params.model';
import { Note } from './note.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IndexedDB } from 'common/indexeddb';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private notes: Note[] = [];

  notes$ = (): Observable<Note[]> => this.notesSubject.asObservable();

  indexedDB = inject(IndexedDB);

  async getAll(): Promise<Note[]> {
    const notes: Note[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('note_')) {
        const note = JSON.parse(localStorage.getItem(key)!) as Note;

        note.images = [];
        if (note.imagesIds) {
          for (const imageId of note.imagesIds) {
            const image = await this.indexedDB.getFile(imageId);
            note.images.push(image);
          }
        }

        notes.push(note);
      }
    }
    this.notes = notes;
    this.notesSubject.next(this.notes);
    return notes;
  }

  get(id: string): Observable<Note> {
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      throw new Error('Note not found');
    }
    return of(note);
  }

  async create(note: NoteCreateParams) {
    const imagesIds: string[] = [];
    if (note.images.length > 0) {
      for (const image of note.images) {
        const imageId = await this.indexedDB.saveFile(image);
        imagesIds.push(imageId);
      }
    }

    const newNote = {
      id: Math.random().toString(36).substring(2, 9),
      created_at: new Date(),
      updated_at: new Date(),
      user: 'bruno',
      isPinned: false,
      color: note.color,
      title: note.title,
      content: note.content,
      imagesIds: imagesIds,
    };
    localStorage.setItem('note_' + newNote.id, JSON.stringify(newNote));

    const fullNote = { ...newNote, images: note.images };
    this.notes.push(fullNote);
    this.notesSubject.next(this.notes);
    return fullNote;
  }

  update(id: string, updatedValues: Partial<Note>): Note {
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      throw new Error('Note not found');
    }

    const updatedNote = { ...note, ...updatedValues, updated_at: new Date() };
    localStorage.setItem('note_' + id, JSON.stringify(updatedNote));
    this.getAll();
    return updatedNote;
  }

  async delete(note: Note): Promise<Note> {
    localStorage.removeItem('note_' + note.id);

    for (const imageId of note.imagesIds) {
      await this.indexedDB.deleteFile(imageId);
    }

    this.notes = this.notes.filter((n) => n.id !== note.id);
    this.notesSubject.next(this.notes);
    return note;
  }
}
