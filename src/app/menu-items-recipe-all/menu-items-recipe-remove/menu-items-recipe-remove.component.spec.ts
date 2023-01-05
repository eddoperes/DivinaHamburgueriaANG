import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsRecipeRemoveComponent } from './menu-items-recipe-remove.component';

describe('MenuItemsRecipeRemoveComponent', () => {
  let component: MenuItemsRecipeRemoveComponent;
  let fixture: ComponentFixture<MenuItemsRecipeRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsRecipeRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsRecipeRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
