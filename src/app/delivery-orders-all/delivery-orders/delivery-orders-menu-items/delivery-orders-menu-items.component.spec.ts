import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrdersMenuItemsComponent } from './delivery-orders-menu-items.component';

describe('DeliveryOrdersMenuItemsComponent', () => {
  let component: DeliveryOrdersMenuItemsComponent;
  let fixture: ComponentFixture<DeliveryOrdersMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrdersMenuItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryOrdersMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
