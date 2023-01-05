import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsRecipeComponent } from './menu-items-recipe.component';

describe('MenuItemsRecipeComponent', () => {
  let component: MenuItemsRecipeComponent;
  let fixture: ComponentFixture<MenuItemsRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
