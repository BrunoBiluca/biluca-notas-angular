import { Component, inject, OnInit, signal } from '@angular/core';
import { NotesService } from '../services/notes-service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Note } from '../services/note.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'note-detail',
  imports: [CommonModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './note-detail.html',
  styleUrl: './note-detail.scss',
})
export class NoteDetail implements OnInit {
  note = signal<Note | undefined>(undefined);
  title = signal('');
  content = signal<string | null>('');
  notesService = inject(NotesService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  images = signal<string[]>([]);

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.notesService.get(params['id'])))
      .subscribe((n) => {
        this.note.set(n);
        this.title.set(n.title);
        this.content.set(n.content);
        this.images.set(n.images.map((image) => URL.createObjectURL(image)));
      });
  }

  save() {
    this.notesService.update(this.note()!.id, {
      title: this.title(),
      content: this.content(),
    });
  }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
