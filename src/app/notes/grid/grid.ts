import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NotesPresenter } from '../notes-presenter';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FileToURLPipe } from 'common/file-to-url-pipe';
import { MatButtonModule } from '@angular/material/button';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TogglePin } from '../actions/toggle-pin/toggle-pin';
import { Delete } from '../actions/delete/delete';
import { AdaptCustomColor } from '@app/shared/adapt-custom-color/adapt-custom-color';

@Component({
  selector: 'notes-grid',
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FileToURLPipe,
    CdkDrag,
    CdkDropList,
    RouterLink,
    RouterLinkActive,
    TogglePin,
    Delete,
    AdaptCustomColor,
  ],
  templateUrl: `grid.html`,
  styleUrls: [
    'grid.scss',
    '../drag-n-drop.scss',
    '../../shared/adapt-custom-color/adapt-custom-color.scss',
  ],
})
export class Grid extends NotesPresenter {}
