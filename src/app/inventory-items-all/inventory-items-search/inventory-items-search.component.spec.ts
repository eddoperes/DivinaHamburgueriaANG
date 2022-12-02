import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemsSearchComponent } from './inventory-items-search.component';

describe('InventoryItemsSearchComponent', () => {
  let component: InventoryItemsSearchComponent;
  let fixture: ComponentFixture<InventoryItemsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItemsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
