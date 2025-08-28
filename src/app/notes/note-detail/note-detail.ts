import { Component, inject, OnInit, signal } from '@angular/core';
import { NotesService } from '../services/notes-service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Note } from '../services/note.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NoteColorInput } from '../note-form/note-color-input/note-color-input';

@Component({
  selector: 'note-detail',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NoteColorInput,
  ],
  templateUrl: './note-detail.html',
  styleUrl: './note-detail.scss',
})
export class NoteDetail implements OnInit {
  notesService = inject(NotesService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  note = signal<Note | undefined>(undefined);
  title = signal('');
  content = signal<string | null>('');
  color = signal<string>('white');
  images = signal<string[]>([]);

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.notesService.get(params['id'])))
      .subscribe((n) => {
        this.note.set(n);
        this.title.set(n.title);
        this.content.set(n.content);
        this.color.set(n.color ? n.color : 'white');
        this.images.set(n.images.map((image) => URL.createObjectURL(image)));
      });
  }

  save() {
    this.notesService.update(this.note()!.id, {
      title: this.title(),
      content: this.content(),
    });
  }

  updateColor(color: string) {
    this.color.set(color);
    this.notesService.update(this.note()!.id, {
      color: color,
    });
  }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
