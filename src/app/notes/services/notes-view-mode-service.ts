import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesViewModeService {
  private viewModeSubject = new BehaviorSubject<'list' | 'grid'>('list');
  viewMode$ = (): Observable<'list' | 'grid'> =>
    this.viewModeSubject.asObservable();

  getCurrent(): string {
    return localStorage.getItem('viewMode')!;
  }

  setViewMode(mode: 'list' | 'grid') {
    this.viewModeSubject.next(mode);
    localStorage.setItem('viewMode', mode);
  }

  constructor() {
    let savedMode = localStorage.getItem('viewMode');

    if (savedMode === null) {
      localStorage.setItem('viewMode', 'list');
      savedMode = localStorage.getItem('viewMode')!;
    }

    if (savedMode === 'list' || savedMode === 'grid') {
      this.viewModeSubject.next(savedMode);
    }
  }
}
