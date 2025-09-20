import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotesPresenter } from '../notes-presenter';
import { MatIconModule } from '@angular/material/icon';
import { FileToURLPipe } from 'common/file-to-url-pipe';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FileToURLPipe,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './notes-list.html',
  styleUrls: ['./notes-list.scss', '../drag-n-drop.scss'],
})
export class NotesList extends NotesPresenter {}
