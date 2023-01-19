import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersRemoveComponent } from './providers-remove.component';

describe('ProvidersRemoveComponent', () => {
  let component: ProvidersRemoveComponent;
  let fixture: ComponentFixture<ProvidersRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
