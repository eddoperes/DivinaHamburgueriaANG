import { TestBed } from '@angular/core/testing';

import { DeliveryOrdersService } from './delivery-orders.service';

describe('DeliveryOrdersService', () => {
  let service: DeliveryOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
