//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

//data
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';

//form
import { InventoryItemsComponent } from '../inventory-items/inventory-items.component';

@Component({
  selector: 'app-inventory-items-new',
  templateUrl: './inventory-items-new.component.html',
  styleUrls: ['./inventory-items-new.component.scss']
})
export class InventoryItemsNewComponent implements OnInit {

  constructor(private inventoryItemsService: InventoryItemsService,
              private router: Router) { }

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  ngOnInit(): void {    
  }

  public setFormComponent(formComponent: InventoryItemsComponent){    
    var configure:any = {
      disableInputs: false,
    }
    formComponent.populateConfig(configure);
  }

  public sendData(id: number, form: FormGroup):void{
    
    this.inventoryItemsService
        .itensDoEstoqueNew(id, form.value)    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('inventoryitems')},
          error: (error) => { console.log(error) }
        });                  

  }

}
