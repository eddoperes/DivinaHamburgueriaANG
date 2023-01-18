import { TestBed } from '@angular/core/testing';

import { InventoryItemsService } from './inventoryitems.service';

describe('InventoryitemsService', () => {
  let service: InventoryItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
