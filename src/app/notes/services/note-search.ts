import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteSearch {
  private state = new BehaviorSubject<string>('');
  private current = this.state.asObservable();

  current$() {
    return this.current;
  }

  update(v: string) {
    this.state.next(v);
  }
}
