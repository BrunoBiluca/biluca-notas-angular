import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesPresenter } from './notes-presenter';
import { provideRouter, Router } from '@angular/router';
import { Note } from './services/note.model';
import { routes } from 'app/app.routes';

type ClassType<T> = new (...args: any[]) => T;

export function execNotesPresenterTests<T extends NotesPresenter>(
  classType: ClassType<T>
) {
  let component: T;
  let fixture: ComponentFixture<T>;

  let router: Router;
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

  describe('NotesPresenter', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [classType],
        providers: [provideRouter(routes)],
      }).compileComponents();

      fixture = TestBed.createComponent(classType);
      component = fixture.componentInstance;
      fixture.detectChanges();

      router = TestBed.inject(Router);
      spyOn(router, 'navigate');
    });

    it('should display notes as a list', () => {
      component.notes = mockNotes();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(
        2
      );
    });

    it('should display pinned notes in pinned area', () => {
      component.notes = mockNotes();

      fixture.detectChanges();

      const pinnedList = fixture.nativeElement.querySelector('#pinned-notes');
      expect(pinnedList.querySelectorAll('.note-item').length).toBe(1);
    });

    it('should display unpinned notes in others notes area', () => {
      const onTogglePin = spyOn(component.onTogglePin, 'emit');
      const notes = mockNotes();
      component.notes = notes;

      fixture.detectChanges();

      const pinnedNoteButton = fixture.nativeElement
        .querySelector('#pinned-notes')
        .querySelector('.note-item')
        .querySelector('button[data-action="toggle-pin"]');

      pinnedNoteButton.dispatchEvent(new Event('click'));

      expect(onTogglePin).toHaveBeenCalledWith(notes[0]);
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
}
