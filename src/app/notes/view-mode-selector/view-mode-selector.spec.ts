import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModeSelector } from './view-mode-selector';

describe('ViewModeSelector', () => {
  let component: ViewModeSelector;
  let fixture: ComponentFixture<ViewModeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewModeSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewModeSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
