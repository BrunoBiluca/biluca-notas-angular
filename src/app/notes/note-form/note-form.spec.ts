import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteForm } from './note-form';

describe('NoteForm', () => {
  let component: NoteForm;
  let fixture: ComponentFixture<NoteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const title = getTitleField(fixture);
    const content = getContentField(fixture);
    const color = getColorField(fixture);
    const submitBtn = getSubmitBtn(fixture);

    expect(component).toBeTruthy();
    expect(title).toBeTruthy();
    expect(content).toBeTruthy();
    expect(color).toBeTruthy();
    expect(submitBtn).toBeTruthy();
  });

  it("should invalidate form when title is empty", () => {
    const submitBtn = getSubmitBtn(fixture);
    submitBtn.click();
    fixture.detectChanges();

    expect(component.createNoteForm.invalid).toBeTrue();
    expect(submitBtn.disabled).toBeTrue();
  });

  it("should submit form when all validations are passed", () => {
    const title = getTitleField(fixture);
    title.value = "title";
    title.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.createNoteForm.invalid).toBeFalse();
  });
});

function getSubmitBtn(fixture: ComponentFixture<NoteForm>) {
  return fixture.nativeElement.querySelector("button[type='submit']");
}

function getColorField(fixture: ComponentFixture<NoteForm>) {
  return fixture.nativeElement.querySelector("input[formControlName='color']");
}

function getContentField(fixture: ComponentFixture<NoteForm>) {
  return fixture.nativeElement.querySelector("textarea[formControlName='content']");
}

function getTitleField(fixture: ComponentFixture<NoteForm>) {
  return fixture.nativeElement.querySelector("input[formControlName='title']");
}

