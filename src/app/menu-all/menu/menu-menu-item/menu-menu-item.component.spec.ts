import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMenuItemComponent } from './menu-menu-item.component';

describe('MenuMenuItemComponent', () => {
  let component: MenuMenuItemComponent;
  let fixture: ComponentFixture<MenuMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
