import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsRecipeNewComponent } from './menu-items-recipe-new.component';

describe('MenuItemsRecipeNewComponent', () => {
  let component: MenuItemsRecipeNewComponent;
  let fixture: ComponentFixture<MenuItemsRecipeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsRecipeNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsRecipeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
