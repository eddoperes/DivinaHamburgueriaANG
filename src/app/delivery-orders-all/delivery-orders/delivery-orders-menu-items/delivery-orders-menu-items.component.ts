//angular
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { DeliveryOrderMenuItem } from 'src/app/module/deliveryOrderMenuItem';

@Component({
  selector: 'app-delivery-orders-menu-items',
  templateUrl: './delivery-orders-menu-items.component.html',
  styleUrls: ['./delivery-orders-menu-items.component.scss']
})
export class DeliveryOrdersMenuItemsComponent implements OnInit {

  public deliveryOrderMenuItemsForm: FormGroup = this.formBuilder.group({
    id : 0,
    menuItemId : 1,
    price: 0,
    observation: "",    
  });

  @Input() menuItems: Array<any> = [];
  @Input() number: number = -1;

  public priceError : string = "";

  public newOrEdit: boolean = true;
  public disableItemsButtons = false;

  public deleted: boolean = false;

  public getSubForm (){
    if (this.deleted)
      return null;
    else
      return this.deliveryOrderMenuItemsForm;
  } 

  public hideComponent(event: any){
    this.deleted = true;
  }

  public isDependecyReady() : boolean{
    if (this.menuItems.length === 0)
      return false;
    return true;
  }

  public populateData(item: DeliveryOrderMenuItem){
    this.deliveryOrderMenuItemsForm = this.formBuilder.group({
      id : [item.id],
      menuItemId : [item.menuItemId],
      price: [item.price],
      observation: [item.observation],   
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.deliveryOrderMenuItemsForm.controls['menuItemId'].disable();
      this.deliveryOrderMenuItemsForm.controls['price'].disable();
      this.deliveryOrderMenuItemsForm.controls['observation'].disable();
      this.newOrEdit = false;
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { 
  }

}

