import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSelector } from './order-selector';

describe('OrderSelector', () => {
  let component: OrderSelector;
  let fixture: ComponentFixture<OrderSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
