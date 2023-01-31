import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrdersNewComponent } from './delivery-orders-new.component';

describe('DeliveryOrdersNewComponent', () => {
  let component: DeliveryOrdersNewComponent;
  let fixture: ComponentFixture<DeliveryOrdersNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrdersNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryOrdersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
