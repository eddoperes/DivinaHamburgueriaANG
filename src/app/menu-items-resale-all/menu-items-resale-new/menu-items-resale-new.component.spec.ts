import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemResaleNewComponent } from './menu-items-resale-new.component';

describe('MenuItemResaleNewComponent', () => {
  let component: MenuItemResaleNewComponent;
  let fixture: ComponentFixture<MenuItemResaleNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemResaleNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemResaleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
