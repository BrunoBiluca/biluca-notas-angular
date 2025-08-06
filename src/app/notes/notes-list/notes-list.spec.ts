import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesList } from './notes-list';
import { NotesService } from '../notes-service';

describe('NotesList', () => {
  let component: NotesList;
  let fixture: ComponentFixture<NotesList>;

  let notesService = jasmine.createSpyObj('NotesService', ['update']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesList],
      providers: [{ provide: NotesService, useValue: notesService }],
    }).compileComponents();

    notesService.update.and.callFake(() => {});

    fixture = TestBed.createComponent(NotesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display notes as a list', () => {
    component.notes = [
      {
        id: '1',
        title: 'title',
        content: 'content',
        color: '#8FF0A4',
        created_at: new Date(),
        updated_at: new Date(),
        user: 'bruno',
      },
      {
        id: '2',
        title: 'title',
        content: 'content',
        color: '#8FF0A4',
        created_at: new Date(),
        updated_at: new Date(),
        user: 'bruno',
      },
    ];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
  });

  it('should pin note on the beginning of the list', () => {
    component.notes = [
      {
        id: '1',
        title: 'title',
        content: 'content',
        color: '#8FF0A4',
        isPinned: true,
        created_at: new Date(),
        updated_at: new Date(),
        user: 'bruno',
      },
      {
        id: '2',
        title: 'title',
        content: 'content',
        color: '#8FF0A4',
        created_at: new Date(),
        updated_at: new Date(),
        user: 'bruno',
      },
    ];

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
    expect(fixture.nativeElement.querySelector('.note-item').classList.contains('pinned')).toBeTrue();
  });

  it('should unpin note', () => {
    const notes = [
      {
        id: '1',
        title: 'title',
        content: 'content',
        color: '#8FF0A4',
        created_at: new Date(),
        updated_at: new Date(),
        user: 'bruno',
      },
      {
        id: '2',
        title: 'title',
        content: 'content',
        color: '#8FF0A4',
        isPinned: true,
        created_at: new Date(),
        updated_at: new Date(),
        user: 'bruno',
      },
    ];
    component.notes = notes;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.note-item').classList.contains('pinned')).toBeTrue();

    component.togglePin(notes[1]);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
    expect(fixture.nativeElement.querySelector('.note-item').classList.contains('pinned')).toBeFalse();
  });
});
