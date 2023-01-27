//angular
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { HallOrderMenuItem } from 'src/app/module/hallOrderMenuItem';

@Component({
  selector: 'app-hall-orders-menu-items',
  templateUrl: './hall-orders-menu-items.component.html',
  styleUrls: ['./hall-orders-menu-items.component.scss']
})
export class HallOrdersMenuItemsComponent implements OnInit {

  public hallOrderMenuItemsForm: FormGroup = this.formBuilder.group({
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
      return this.hallOrderMenuItemsForm;
  } 

  public hideComponent(event: any){
    this.deleted = true;
  }

  public isDependecyReady() : boolean{
    if (this.menuItems.length === 0)
      return false;
    return true;
  }

  public populateData(item: HallOrderMenuItem){
    this.hallOrderMenuItemsForm = this.formBuilder.group({
      id : [item.id],
      menuItemId : [item.menuItemId],
      price: [item.price],
      observation: [item.observation],   
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.hallOrderMenuItemsForm.controls['menuItemId'].disable();
      this.hallOrderMenuItemsForm.controls['price'].disable();
      this.hallOrderMenuItemsForm.controls['observation'].disable();
      this.newOrEdit = false;
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { 
  }

}
