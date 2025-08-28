import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'note-color-input',
  imports: [MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './note-color-input.html',
  styleUrl: './note-color-input.scss',
})
export class NoteColorInput {
  color = model<string>('white');
  onColorChange = output<string>();

  update() {
    console.log(this.color);
    this.onColorChange.emit(this.color());
  }
}
