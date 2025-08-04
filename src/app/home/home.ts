import { Component } from '@angular/core';
import { NoteForm } from "app/notes/note-form/note-form";

@Component({
  selector: 'app-home',
  imports: [NoteForm],
  template: `
    <h1>Notas</h1>
    <note-form></note-form>
  `,
  styles: ``
})
export class Home {

}
