import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDetail } from './note-detail';
import { provideRouter } from '@angular/router';
import { routes } from 'app/app.routes';

describe('NoteDetail', () => {
  let component: NoteDetail;
  let fixture: ComponentFixture<NoteDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteDetail],
      providers: [
        provideRouter(routes),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
