import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsResaleRemoveComponent } from './menu-items-resale-remove.component';

describe('MenuItemsResaleRemoveComponent', () => {
  let component: MenuItemsResaleRemoveComponent;
  let fixture: ComponentFixture<MenuItemsResaleRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsResaleRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsResaleRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
