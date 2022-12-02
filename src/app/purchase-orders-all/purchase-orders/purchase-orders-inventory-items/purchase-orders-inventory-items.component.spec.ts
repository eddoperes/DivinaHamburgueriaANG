import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersInventoryItemsComponent } from './purchase-orders-inventory-items.component';

describe('PurchaseOrdersInventoryItemsComponent', () => {
  let component: PurchaseOrdersInventoryItemsComponent;
  let fixture: ComponentFixture<PurchaseOrdersInventoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersInventoryItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrdersInventoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
