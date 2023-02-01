import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsNewComponent } from './alarms-new.component';

describe('AlarmsNewComponent', () => {
  let component: AlarmsNewComponent;
  let fixture: ComponentFixture<AlarmsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
