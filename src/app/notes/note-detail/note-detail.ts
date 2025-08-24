import { Component, inject, OnInit, signal } from '@angular/core';
import { NotesService } from '../services/notes-service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Note } from '../services/note.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'note-detail',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './note-detail.html',
  styleUrl: './note-detail.scss',
})
export class NoteDetail implements OnInit {
  note = signal<Note | undefined>(undefined);
  notesService = inject(NotesService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  images = signal<string[]>([]);

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.notesService.get(params['id'])))
      .subscribe((n) => {
        this.note.set(n);
        this.images.set(n.images.map((image) => URL.createObjectURL(image)));
      });
  }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
