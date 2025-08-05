import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NotesViewModeService } from '../notes-view-mode-service';

@Component({
  selector: 'notes-view-mode-selector',
  imports: [MatButtonToggleModule],
  template: `
    <mat-button-toggle-group
      name="fontStyle"
      aria-label="Font Style"
      [value]="mode()"
      (change)="setViewMode($event.value)"
    >
      <mat-button-toggle value="list">List</mat-button-toggle>
      <mat-button-toggle value="grid">Grid</mat-button-toggle>
    </mat-button-toggle-group>
  `,
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
