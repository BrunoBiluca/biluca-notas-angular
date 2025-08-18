import { TestBed } from '@angular/core/testing';

import { NotesViewModeService } from './notes-view-mode-service';

describe('NotesViewModeService', () => {
  let service: NotesViewModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesViewModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
