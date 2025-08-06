import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesList } from './notes-list';
import { NotesService } from '../notes-service';
import { provideRouter, Router } from '@angular/router';
import { routes } from 'app/app.routes';

describe('NotesList', () => {
  let component: NotesList;
  let fixture: ComponentFixture<NotesList>;

  let router: Router;
  let notesService = jasmine.createSpyObj('NotesService', ['update']);
  let mockNotes = [
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesList],
      providers: [
        provideRouter(routes),
        { provide: NotesService, useValue: notesService }],
    }).compileComponents();

    notesService.update.and.callFake(() => {});

    fixture = TestBed.createComponent(NotesList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should display notes as a list', () => {
    component.notes = mockNotes;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
  });

  it('should pin note on the beginning of the list', () => {
    component.notes = mockNotes;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
    expect(
      fixture.nativeElement
        .querySelector('.note-item')
        .classList.contains('pinned')
    ).toBeTrue();
  });

  it('should unpin note', () => {
    const notes = mockNotes;
    component.notes = mockNotes;

    fixture.detectChanges();

    expect(
      fixture.nativeElement
        .querySelector('.note-item')
        .classList.contains('pinned')
    ).toBeTrue();

    component.togglePin(notes[0]);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(2);
    expect(
      fixture.nativeElement
        .querySelector('.note-item')
        .classList.contains('pinned')
    ).toBeFalse();
  });

  it("should show note's details when note is clicked", () => {
    const notes = mockNotes;
    component.notes = notes;

    fixture.detectChanges();

    fixture.nativeElement
      .querySelector('.note-item')
      .dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/notes', notes[0].id]);
  })
});
