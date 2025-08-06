import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesList } from './notes-list';

describe('NotesList', () => {
  let component: NotesList;
  let fixture: ComponentFixture<NotesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesList],
    }).compileComponents();

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
});
