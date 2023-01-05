import { TestBed } from '@angular/core/testing';

import { MenuItemsResaleService } from './menu-items-resale.service';

describe('MenuItemsResaleService', () => {
  let service: MenuItemsResaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemsResaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
