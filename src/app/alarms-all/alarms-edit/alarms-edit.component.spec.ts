import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsEditComponent } from './alarms-edit.component';

describe('AlarmsEditComponent', () => {
  let component: AlarmsEditComponent;
  let fixture: ComponentFixture<AlarmsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
