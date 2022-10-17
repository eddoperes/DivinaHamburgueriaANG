import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDoEstoqueComponent } from './item-do-estoque.component';

describe('ItemDoEstoqueComponent', () => {
  let component: ItemDoEstoqueComponent;
  let fixture: ComponentFixture<ItemDoEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDoEstoqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
