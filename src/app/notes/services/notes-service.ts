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
  private orderFunc: (n1: Note, n2: Note) => number = (n1, n2) => 0;
  indexedDB = inject(IndexedDB);

  notes$ = (): Observable<Note[]> => this.notesSubject.asObservable();

  private async getFromStorage(id: string): Promise<Note> {
    const noteStorage = localStorage.getItem('note_' + id);
    if (!noteStorage) {
      throw new Error('Note not found');
    }

    const note: Note = JSON.parse(noteStorage);
    note.images = [];
    if (note.imagesIds) {
      for (const imageId of note.imagesIds) {
        const image = await this.indexedDB.getFile(imageId);
        note.images.push(image);
      }
    }
    return note;
  }

  private updateNotes() {
    this.notes = this.notes.sort(this.orderFunc);
    this.notesSubject.next([...this.notes]);
  }

  async getAll(): Promise<Note[]> {
    const notes: Note[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('note_')) {
        notes.push(await this.getFromStorage(key.substring(5)));
      }
    }

    this.notes = notes;
    this.updateNotes();
    return notes;
  }

  async get(id: string): Promise<Note> {
    return this.getFromStorage(id);
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
    this.updateNotes();
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

    if (note.imagesIds) {
      for (const imageId of note.imagesIds) {
        await this.indexedDB.deleteFile(imageId);
      }
    }

    this.notes = this.notes.filter((n) => n.id !== note.id);
    this.updateNotes();
    return note;
  }

  setOrderFunc(f: (n1: Note, n2: Note) => number) {
    this.orderFunc = f;
    this.notesSubject.next([...this.notes.sort(f)]);
  }
}
