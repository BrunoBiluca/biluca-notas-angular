import { Grid } from './grid';
import { execNotesPresenterTests } from '../notes-presenter.spec';

describe('Grid', () => {
  execNotesPresenterTests<Grid>(Grid);
});
