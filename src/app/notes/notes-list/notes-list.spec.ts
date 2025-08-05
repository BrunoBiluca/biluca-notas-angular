import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesList } from './notes-list';

describe('NotesList', () => {
  let component: NotesList;
  let fixture: ComponentFixture<NotesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesList]
    })
    .compileComponents();

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

    expect(component).toBeTruthy();
    expect(
      fixture.nativeElement.querySelectorAll('[class="note-item"]').length
    ).toBe(2);
  });
});
