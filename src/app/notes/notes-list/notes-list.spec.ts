import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesList } from './notes-list';
import { NotesService } from 'app/notes/services/notes-service';
import { provideRouter, Router } from '@angular/router';
import { routes } from 'app/app.routes';
import { Note } from '../services/note.model';

describe('NotesList', () => {
  let component: NotesList;
  let fixture: ComponentFixture<NotesList>;

  let router: Router;
  let notesService = jasmine.createSpyObj('NotesService', ['update']);
  const mockNotes = (): Note[] => [
    {
      id: '1',
      title: 'title',
      content: 'content',
      color: '#8FF0A4',
      isPinned: true,
      imagesIds: [],
      images: [],
      created_at: new Date(),
      updated_at: new Date(),
      user: 'bruno',
    },
    {
      id: '2',
      title: 'title',
      content: 'content',
      color: '#8FF0A4',
      imagesIds: [],
      images: [],
      created_at: new Date(),
      updated_at: new Date(),
      user: 'bruno',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesList],
      providers: [
        provideRouter(routes),
        { provide: NotesService, useValue: notesService },
      ],
    }).compileComponents();

    notesService.update.and.callFake(() => {});

    fixture = TestBed.createComponent(NotesList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should display notes as a list', () => {
    component.notes = mockNotes();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
  });

  it('should pin note in pinned list', () => {
    component.notes = mockNotes();

    fixture.detectChanges();

    const pinnedList = fixture.nativeElement.querySelector('#pinned-notes');
    expect(pinnedList.querySelectorAll('.note-item').length).toBe(1);
  });

  it('should unpin note', () => {
    const notes = mockNotes();
    component.notes = notes;

    fixture.detectChanges();

    const pinnedList = fixture.nativeElement.querySelector('#pinned-notes');
    expect(pinnedList.querySelectorAll('.note-item').length).toBe(1);

    component.togglePin(notes[0]);

    fixture.detectChanges();

    expect(pinnedList.querySelectorAll('.note-item').length).toBe(0);
  });

  it("should show note's details when note is clicked", () => {
    const notes = mockNotes();
    component.notes = notes;

    fixture.detectChanges();

    fixture.nativeElement
      .querySelector('.note-item')
      .dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/notes', notes[0].id]);
  });
});
