import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInventoryItemsResaleComponent } from './menu-items-resale.component';

describe('MenuInventoryItemsResaleComponent', () => {
  let component: MenuInventoryItemsResaleComponent;
  let fixture: ComponentFixture<MenuInventoryItemsResaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuInventoryItemsResaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuInventoryItemsResaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
