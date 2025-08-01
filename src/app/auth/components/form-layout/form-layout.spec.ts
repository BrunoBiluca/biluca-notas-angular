import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLayout } from './form-layout';

describe('FormLayout', () => {
  let component: FormLayout;
  let fixture: ComponentFixture<FormLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
