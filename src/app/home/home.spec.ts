import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { NotesService } from 'app/notes/services/notes-service';
import { NotesViewModeService } from 'app/notes/services/notes-view-mode-service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Note } from 'app/notes/services/note.model';
import { NoteSearch } from 'app/notes/services/note-search';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  let notesService = jasmine.createSpyObj('NotesService', [
    'getAll',
    'notes$',
    'delete',
  ]);
  let notesViewModeService = jasmine.createSpyObj('NotesViewModeService', [
    'setViewMode',
    'getCurrent',
    'viewMode$',
  ]);
  let noteSearch = jasmine.createSpyObj(NoteSearch, ['current$']);
  let searchTerm: BehaviorSubject<string>;

  beforeEach(async () => {
    searchTerm = new BehaviorSubject<string>('');
    noteSearch.current$.and.callFake(() => searchTerm.asObservable());

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: NotesService, useValue: notesService },
        { provide: NotesViewModeService, useValue: notesViewModeService },
        { provide: NoteSearch, useValue: noteSearch },
      ],
    }).compileComponents();

    const notesSubject = new BehaviorSubject<Note[]>([]);
    notesService.getAll.and.callFake(() => {
      notesSubject.next([
        {
          id: '1',
          title: 'note 1',
          content: 'abc',
          color: '#8FF0A4',
          created_at: new Date(),
          updated_at: new Date(),
          user: 'bruno',
        },
        {
          id: '2',
          title: 'note 2',
          content: 'def',
          color: '#8FF0A4',
          created_at: new Date(),
          updated_at: new Date(),
          user: 'bruno',
        },
      ]);
    });
    notesService.notes$.and.callFake(() => notesSubject.asObservable());
    notesService.delete.and.callFake((note: Note) => {
      notesSubject.next(
        notesSubject.getValue().filter((n) => n.id !== note.id)
      );
      return note;
    });

    const viewModeSubject = new BehaviorSubject<'list' | 'grid'>('list');
    notesViewModeService.getCurrent.and.callFake(() => 'list');
    notesViewModeService.viewMode$.and.callFake(() =>
      viewModeSubject.asObservable()
    );
    notesViewModeService.setViewMode.and.callFake((mode: 'grid' | 'list') => {
      viewModeSubject.next(mode);
    });

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display main components', () => {
    expect(getNotesView('list', fixture)).toBeTruthy();
  });

  it('should change notes view', () => {
    notesViewModeService.setViewMode('grid');
    fixture.detectChanges();
    expect(getNotesView('grid', fixture)).toBeTruthy();

    notesViewModeService.setViewMode('list');
    fixture.detectChanges();
    expect(getNotesView('list', fixture)).toBeTruthy();
  });

  it('should display all saved notes', () => {
    fixture.detectChanges();

    expect(getNotesView('list', fixture)).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
  });

  it('should update notes view when note is deleted', () => {
    component.deleteNote({
      id: '1',
      title: 'title',
      content: 'content',
      color: '#8FF0A4',
      created_at: new Date(),
      updated_at: new Date(),
      user: 'bruno',
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(1);
  });

  it('should display notes that match search term by title', () => {
    searchTerm.next('note 1');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(1);
  });

  it('should display notes that match search term by content', () => {
    searchTerm.next('def');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(1);

    // reset search
    searchTerm.next('');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
  });

  it('should display all notes when searchReset to an empty state', () => {
    searchTerm.next('def');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(1);

    // reset search
    searchTerm.next('');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
  });

  it('should display message when there are no notes', () => {
    searchTerm.next('non-existing-note');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.no-notes')).toBeTruthy();
  });
});

function getNotesView(mode: 'grid' | 'list', fixture: ComponentFixture<Home>) {
  return fixture.nativeElement.querySelector('notes-' + mode);
}

function getNotesViewModeSelector(fixture: ComponentFixture<Home>) {
  return fixture.nativeElement.querySelector('notes-view-mode-selector');
}

function getSearchInput(fixture: ComponentFixture<Home>) {
  return fixture.nativeElement.querySelector('#search');
}
