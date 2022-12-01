import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemsEditComponent } from './inventory-items-edit.component';

describe('InventoryItemsEditComponent', () => {
  let component: InventoryItemsEditComponent;
  let fixture: ComponentFixture<InventoryItemsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItemsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
