import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemsNewComponent } from './inventory-items-new.component';

describe('InventoryItemsNewComponent', () => {
  let component: InventoryItemsNewComponent;
  let fixture: ComponentFixture<InventoryItemsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItemsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
