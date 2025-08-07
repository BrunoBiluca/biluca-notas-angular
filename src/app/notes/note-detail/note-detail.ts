import { Component, inject, OnInit, signal } from '@angular/core';
import { NotesService } from '../notes-service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Note } from '../note.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'note-detail',
  imports: [CommonModule],
  template: `
    <div *ngIf="note(); let n">
      <h1>{{ n.title }}</h1>
      <p>{{ n.content }}</p>
      <p>Criado em: {{ n.created_at | date : 'dd/MM/yyyy' }}</p>
      <p>Atualizado em:{{ n.updated_at | date : 'dd/MM/yyyy' }}</p>
    </div>
  `,
})
export class NoteDetail implements OnInit {
  note = signal<Note | undefined>(undefined);
  notesService = inject(NotesService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap((params) => this.notesService.get(params['id'])))
      .subscribe((n) => this.note.set(n));
  }
}
