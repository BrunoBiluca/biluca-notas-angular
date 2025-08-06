import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { NotesService } from 'app/notes/notes-service';
import { NotesViewModeService } from 'app/notes/notes-view-mode-service';
import { BehaviorSubject, of } from 'rxjs';
import { Note } from 'app/notes/note.model';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: NotesService, useValue: notesService },
        { provide: NotesViewModeService, useValue: notesViewModeService },
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
      const newLocal = notesSubject.getValue();
      notesSubject.next(newLocal.filter((n) => n.id !== note.id));
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
    expect(getSearchInput(fixture)).toBeTruthy();
    expect(getNotesViewModeSelector(fixture)).toBeTruthy();
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
    const searchInput = fixture.nativeElement.querySelector('#search');
    searchInput.value = 'note 1';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(1);

    // reset search
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
  });

  it('should display notes that match search term by content', () => {
    const searchInput = fixture.nativeElement.querySelector('#search');
    searchInput.value = 'def';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(1);

    // reset search
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
  });

  it('should display message when there are no notes', () => {
    const searchInput = fixture.nativeElement.querySelector('#search');
    searchInput.value = 'non-existing-note';
    searchInput.dispatchEvent(new Event('input'));
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
