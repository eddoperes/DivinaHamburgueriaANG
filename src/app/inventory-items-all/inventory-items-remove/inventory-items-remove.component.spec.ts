import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemsRemoveComponent } from './inventory-items-remove.component';

describe('InventoryItemsRemoveComponent', () => {
  let component: InventoryItemsRemoveComponent;
  let fixture: ComponentFixture<InventoryItemsRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemsRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItemsRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
