import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsRecipeSearchComponent } from './menu-items-recipe-search.component';

describe('MenuItemsRecipeSearchComponent', () => {
  let component: MenuItemsRecipeSearchComponent;
  let fixture: ComponentFixture<MenuItemsRecipeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsRecipeSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsRecipeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
