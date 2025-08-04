import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInput } from './text-input';
import { FormControl } from '@angular/forms';

describe('TextInput', () => {
  let component: TextInput;
  let fixture: ComponentFixture<TextInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInput);
    component = fixture.componentInstance;

    fixture.componentInstance.name = "username";
    fixture.componentInstance.type = "text";
    fixture.componentInstance.ctrl = new FormControl('');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
