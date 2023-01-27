import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallOrdersSearchComponent } from './hall-orders-search.component';

describe('HallOrdersSearchComponent', () => {
  let component: HallOrdersSearchComponent;
  let fixture: ComponentFixture<HallOrdersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallOrdersSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallOrdersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
