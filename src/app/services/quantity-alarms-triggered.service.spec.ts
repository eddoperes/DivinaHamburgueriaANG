import { TestBed } from '@angular/core/testing';

import { QuantityAlarmsTriggeredService } from './quantity-alarms-triggered.service';

describe('QuantityAlarmsTriggeredService', () => {
  let service: QuantityAlarmsTriggeredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantityAlarmsTriggeredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
