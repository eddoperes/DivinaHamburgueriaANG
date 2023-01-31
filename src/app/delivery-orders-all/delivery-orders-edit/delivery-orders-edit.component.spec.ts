import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrdersEditComponent } from './delivery-orders-edit.component';

describe('DeliveryOrdersEditComponent', () => {
  let component: DeliveryOrdersEditComponent;
  let fixture: ComponentFixture<DeliveryOrdersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrdersEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryOrdersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
