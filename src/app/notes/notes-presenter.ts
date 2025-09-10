import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Note } from './services/note.model';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  CdkDragEnd,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  template: '',
})
export abstract class NotesPresenter implements OnInit, OnChanges {
  router = inject(Router);

  @Input() notes: Note[] = [];

  @Output() onTogglePin = new EventEmitter<Note>();
  @Output() onDelete = new EventEmitter<Note>();

  pinnedNotes: Note[] = [];
  otherNotes: Note[] = [];

  isDragging = signal<boolean>(false);

  ngOnInit(): void {
    this.updateNotes(this.notes);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notes']) {
      this.updateNotes(changes['notes'].currentValue);
    }
  }

  private updateNotes(notes: Note[]) {
    this.pinnedNotes = notes.filter((note) => note.isPinned);
    this.otherNotes = notes.filter((note) => !note.isPinned);
  }

  goToNoteDetail(note: Note) {
    this.router.navigate(['/notes', note.id]);
  }

  getStyleByColor(note: Note) {
    return note.color === null ||
      note.color === 'white' ||
      note.color === '#ffffff' ||
      note.color === 'rgb(255, 255, 255)'
      ? 'border: 1px solid #868686'
      : 'background-color: ' + note.color + '; border: 1px solid ' + note.color;
  }

  drop(event: CdkDragDrop<any, any, any>, list: Note[]) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  }

  handleDragEnd($event: CdkDragEnd<any>) {
    setTimeout(() => this.isDragging.set(false), 10);
  }
}
