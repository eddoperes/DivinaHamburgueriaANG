import { TestBed } from '@angular/core/testing';

import { InventoryitemsService } from './inventoryitems.service';

describe('InventoryitemsService', () => {
  let service: InventoryitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
