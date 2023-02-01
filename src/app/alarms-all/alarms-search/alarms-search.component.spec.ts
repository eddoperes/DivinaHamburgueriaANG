import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsSearchComponent } from './alarms-search.component';

describe('AlarmsSearchComponent', () => {
  let component: AlarmsSearchComponent;
  let fixture: ComponentFixture<AlarmsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
