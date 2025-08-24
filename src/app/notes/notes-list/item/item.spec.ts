import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Item } from './item';

describe('Item', () => {
  let component: Item;
  let fixture: ComponentFixture<Item>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Item],
    }).compileComponents();

    fixture = TestBed.createComponent(Item);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    component.note = {
      id: '1',
      title: 'title',
      content: 'content',
      color: '#8FF0A4',
      imagesIds: [],
      images: [],
      created_at: new Date(),
      updated_at: new Date(),
      user: 'bruno',
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
