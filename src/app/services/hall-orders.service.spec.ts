import { TestBed } from '@angular/core/testing';

import { HallOrdersService } from './hall-orders.service';

describe('HallOrderService', () => {
  let service: HallOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HallOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
