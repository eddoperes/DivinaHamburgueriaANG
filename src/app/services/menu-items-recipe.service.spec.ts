import { TestBed } from '@angular/core/testing';

import { MenuItemsRecipeService } from './menu-items-recipe.service';

describe('MenuItemsRecipeService', () => {
  let service: MenuItemsRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemsRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
