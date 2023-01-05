import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsRecipeEditComponent } from './menu-items-recipe-edit.component';

describe('MenuItemsRecipeEditComponent', () => {
  let component: MenuItemsRecipeEditComponent;
  let fixture: ComponentFixture<MenuItemsRecipeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsRecipeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsRecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
