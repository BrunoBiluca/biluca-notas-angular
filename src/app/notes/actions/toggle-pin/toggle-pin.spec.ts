import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglePin } from './toggle-pin';

describe('TogglePin', () => {
  let component: TogglePin;
  let fixture: ComponentFixture<TogglePin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TogglePin],
    }).compileComponents();

    fixture = TestBed.createComponent(TogglePin);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('note', {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
