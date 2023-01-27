import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallOrdersEditComponent } from './hall-orders-edit.component';

describe('HallOrdersEditComponent', () => {
  let component: HallOrdersEditComponent;
  let fixture: ComponentFixture<HallOrdersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallOrdersEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallOrdersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
