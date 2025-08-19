import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NotesViewModeService } from '../services/notes-view-mode-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'notes-view-mode-selector',
  imports: [MatButtonToggleModule, MatIconModule],
  templateUrl: './view-mode-selector.html',
  styleUrl: './view-mode-selector.scss'
})
export class ViewModeSelector implements OnInit {
  mode = signal<string>('');
  notesViewModeService = inject(NotesViewModeService);

  ngOnInit(): void {
    this.mode.set(this.notesViewModeService.getCurrent());
  }

  setViewMode(mode: 'list' | 'grid') {
    this.notesViewModeService.setViewMode(mode);
  }
}
