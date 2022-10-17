import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDoCardapioComponent } from './item-do-cardapio.component';

describe('ItemDoCardapioComponent', () => {
  let component: ItemDoCardapioComponent;
  let fixture: ComponentFixture<ItemDoCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDoCardapioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDoCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
