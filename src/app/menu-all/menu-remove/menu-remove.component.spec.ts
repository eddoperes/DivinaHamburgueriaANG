import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRemoveComponent } from './menu-remove.component';

describe('MenuRemoveComponent', () => {
  let component: MenuRemoveComponent;
  let fixture: ComponentFixture<MenuRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
