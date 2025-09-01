import { execNotesPresenterTests } from '../notes-presenter.spec';
import { NotesList } from './notes-list';


describe('NotesList', () => {
  execNotesPresenterTests<NotesList>(NotesList);
});
