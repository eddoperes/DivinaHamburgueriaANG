//angular
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { MenuMenuItem } from 'src/app/module/menuMenuItem';

@Component({
  selector: 'app-menu-menu-item',
  templateUrl: './menu-menu-item.component.html',
  styleUrls: ['./menu-menu-item.component.scss']
})
export class MenuMenuItemComponent implements OnInit {

  public menuItemsForm: FormGroup = this.formBuilder.group({
    id : 0,
    menuItemId : 0,
    price : 0,
    state : 0
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
      return this.menuItemsForm;
  } 

  public hideComponent(event: any){
    this.deleted = true;
  }

  public isDependecyReady() : boolean{
    if (this.menuItems.length === 0)
      return false;
    return true;
  }

  public populateData(item: MenuMenuItem){
    this.menuItemsForm = this.formBuilder.group({
      id : [item.id],
      menuItemId : [item.menuItemId],
      price: [item.price],
      state: [item.state]     
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.menuItemsForm.controls['menuItemId'].disable();
      this.menuItemsForm.controls['price'].disable();
      this.menuItemsForm.controls['state'].disable();
      this.newOrEdit = false;
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { 
  }

}
