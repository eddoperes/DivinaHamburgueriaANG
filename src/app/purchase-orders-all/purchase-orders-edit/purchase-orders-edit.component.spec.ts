import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderEditComponent } from './purchase-orders-edit.component';

describe('PurchaseOrderEditComponent', () => {
  let component: PurchaseOrderEditComponent;
  let fixture: ComponentFixture<PurchaseOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
