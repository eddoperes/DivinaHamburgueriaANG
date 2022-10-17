import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDoEstoqueEditComponent } from './item-do-estoque-edit.component';

describe('ItemDoEstoqueEditComponent', () => {
  let component: ItemDoEstoqueEditComponent;
  let fixture: ComponentFixture<ItemDoEstoqueEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDoEstoqueEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDoEstoqueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
