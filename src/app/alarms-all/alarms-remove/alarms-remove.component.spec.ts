import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsRemoveComponent } from './alarms-remove.component';

describe('AlarmsRemoveComponent', () => {
  let component: AlarmsRemoveComponent;
  let fixture: ComponentFixture<AlarmsRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmsRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmsRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
