import { TestBed } from '@angular/core/testing';

import { NoteSearch } from './note-search';

describe('NoteSearch', () => {
  let service: NoteSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
