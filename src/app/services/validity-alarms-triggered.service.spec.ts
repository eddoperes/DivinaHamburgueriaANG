import { TestBed } from '@angular/core/testing';

import { ValidityAlarmsTriggeredService } from './validity-alarms-triggered.service';

describe('ValidityAlarmsTriggeredService', () => {
  let service: ValidityAlarmsTriggeredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidityAlarmsTriggeredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
