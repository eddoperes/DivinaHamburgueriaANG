import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsResaleEditComponent } from './menu-items-resale-edit.component';

describe('MenuItemsResaleEditComponent', () => {
  let component: MenuItemsResaleEditComponent;
  let fixture: ComponentFixture<MenuItemsResaleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsResaleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsResaleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
