import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallOrdersMenuItemsComponent } from './hall-orders-menu-items.component';

describe('HallOrdersMenuItemsComponent', () => {
  let component: HallOrdersMenuItemsComponent;
  let fixture: ComponentFixture<HallOrdersMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallOrdersMenuItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallOrdersMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
