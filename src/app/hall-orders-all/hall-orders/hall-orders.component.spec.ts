import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallOrdersComponent } from './hall-orders.component';

describe('HallOrdersComponent', () => {
  let component: HallOrdersComponent;
  let fixture: ComponentFixture<HallOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
