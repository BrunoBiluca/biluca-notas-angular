import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitBtn } from './submit-btn';

describe('SubmitBtn', () => {
  let component: SubmitBtn;
  let fixture: ComponentFixture<SubmitBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
