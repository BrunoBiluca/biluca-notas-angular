import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotesPresenter } from '../notes-presenter';
import { MatIconModule } from '@angular/material/icon';
import { FileToURLPipe } from 'common/file-to-url-pipe';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TogglePin } from "../actions/toggle-pin/toggle-pin";
import { Delete } from "../actions/delete/delete";

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
    RouterLink,
    RouterLinkActive,
    TogglePin,
    Delete
],
  templateUrl: './notes-list.html',
  styleUrls: ['./notes-list.scss', '../drag-n-drop.scss'],
})
export class NotesList extends NotesPresenter {}
