import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { NotesPresenter } from './notes-presenter';
import { provideRouter, RouterModule } from '@angular/router';
import { Note } from './services/note.model';
import { routes } from 'app/app.routes';
import { Location } from '@angular/common';
import { UserService } from 'app/auth/user-service';

type ClassType<T> = new (...args: any[]) => T;

export function execNotesPresenterTests<T extends NotesPresenter>(
  classType: ClassType<T>
) {
  let component: T;
  let fixture: ComponentFixture<T>;

  let location: Location;

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
    let userService = jasmine.createSpyObj('UserService', ['isLoggedIn']);
    userService.isLoggedIn.and.callFake(() => true);
    
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [classType, RouterModule.forRoot(routes)],
        providers: [{ provide: UserService, useValue: userService }],
      }).compileComponents();

      location = TestBed.inject(Location);
    });

    it('should display notes', () => {
      createComponent(mockNotes());

      expect(fixture.nativeElement.querySelectorAll('.note-item').length).toBe(
        2
      );
    });

    it('should display pinned notes in pinned area', () => {
      createComponent(mockNotes());

      const pinnedList = fixture.nativeElement.querySelector('#pinned-notes');
      expect(pinnedList.querySelectorAll('.note-item').length).toBe(1);
    });

    it('should display unpinned notes in others notes area', () => {
      const notes = mockNotes();
      createComponent(notes);
      const onTogglePin = spyOn(component.onTogglePin, 'emit');

      const pinnedNoteButton = fixture.nativeElement
        .querySelector('#pinned-notes')
        .querySelector('.note-item')
        .querySelector('button[data-action="toggle-pin"]');

      pinnedNoteButton.dispatchEvent(new Event('click'));

      expect(onTogglePin).toHaveBeenCalledWith(notes[0]);
    });

    it("should show note's details when note is clicked", fakeAsync(() => {
      const notes = mockNotes();
      createComponent(notes);

      fixture.nativeElement
        .querySelector('.note-item')
        .dispatchEvent(new Event('click'));

      flush();
      fixture.detectChanges();

      expect(location.path()).toBe('/notes/' + notes[0].id);
    }));

    function createComponent(initNotes: Note[]) {
      fixture = TestBed.createComponent(classType);
      component = fixture.componentInstance;
      component.notes = initNotes;
      fixture.detectChanges();
    }
  });
}
