import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersRemoveComponent } from './customers-remove.component';

describe('CustomerRemoveComponent', () => {
  let component: CustomersRemoveComponent;
  let fixture: ComponentFixture<CustomersRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
