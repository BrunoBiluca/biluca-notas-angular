import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteColorInput } from './note-color-input';

describe('NoteColorInput', () => {
  let component: NoteColorInput;
  let fixture: ComponentFixture<NoteColorInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteColorInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteColorInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
