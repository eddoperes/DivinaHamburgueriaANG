import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersNewComponent } from './purchase-orders-new.component';

describe('PurchaseOrdersNewComponent', () => {
  let component: PurchaseOrdersNewComponent;
  let fixture: ComponentFixture<PurchaseOrdersNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrdersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
