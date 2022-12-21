//angular
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { InventoryItem } from 'src/app/module/inventoryItem';
import { PurchaseOrderInventoryItem } from 'src/app/module/purchaseOrderInventoryItem';

@Component({
  selector: 'app-purchase-orders-inventory-items',
  templateUrl: './purchase-orders-inventory-items.component.html',
  styleUrls: ['./purchase-orders-inventory-items.component.scss']
})
export class PurchaseOrdersInventoryItemsComponent implements OnInit {

  public purchaseOrderInventoryItemsForm: FormGroup = this.formBuilder.group({
    id : 0,
    inventoryItemId : 0,
    unitPrice: 0,
    quantity: 0,
    totalPrice: 0     
  });

  @Input() inventoryItems: Array<InventoryItem> = [];
  @Input() number: number = -1;

  public unitPriceError : string = "";
  public quantityError : string = "";
  public totalPriceError : string = "";

  public newOrEdit: boolean = true;
  public disableItemsButtons = false;

  public deleted: boolean = false;

  public getSubForm (){
    if (this.deleted)
      return null;
    else
      return this.purchaseOrderInventoryItemsForm;
  } 

  public hideComponent(event: any){
    this.deleted = true;
    /*
    if (event.target.parentElement !== undefined)
      event.target.parentElement.style.display = "none";
    if(event.target.parentElement.parentElement !== undefined)
      event.target.parentElement.parentElement.style.display = "none";
    */
  }

  public isDependecyReady() : boolean{
    if (this.inventoryItems.length === 0)
      return false;
    return true;
  }

  public populateData(item: PurchaseOrderInventoryItem){
    this.purchaseOrderInventoryItemsForm = this.formBuilder.group({
      id : [item.id],
      inventoryItemId : [item.inventoryItemId],
      unitPrice: [item.unitPrice],
      quantity: [item.quantity],
      totalPrice: [item.totalPrice]     
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.purchaseOrderInventoryItemsForm.controls['inventoryItemId'].disable();
      this.purchaseOrderInventoryItemsForm.controls['unitPrice'].disable();
      this.purchaseOrderInventoryItemsForm.controls['quantity'].disable();
      this.purchaseOrderInventoryItemsForm.controls['totalPrice'].disable();
      this.newOrEdit = false;
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { 
  }

}
