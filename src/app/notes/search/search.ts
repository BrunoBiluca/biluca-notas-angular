import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'notes-search',
  imports: [FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  searchTerm = signal<string>('');
}
