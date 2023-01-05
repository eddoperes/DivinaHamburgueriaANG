import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsResaleSearchComponent } from './menu-items-resale-search.component';

describe('MenuItemsResaleSearchComponent', () => {
  let component: MenuItemsResaleSearchComponent;
  let fixture: ComponentFixture<MenuItemsResaleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsResaleSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsResaleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
