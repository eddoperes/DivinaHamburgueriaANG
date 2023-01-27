import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallOrdersNewComponent } from './hall-orders-new.component';

describe('HallOrdersNewComponent', () => {
  let component: HallOrdersNewComponent;
  let fixture: ComponentFixture<HallOrdersNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallOrdersNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallOrdersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
