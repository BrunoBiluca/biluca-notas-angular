import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grid } from './grid';

describe('Grid', () => {
  let component: Grid;
  let fixture: ComponentFixture<Grid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Grid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
      fixture.nativeElement.querySelectorAll('.note-item').length
    ).toBe(2);
  });
});
