//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { InventoryService } from 'src/app/services/inventory.service';

//form
import { InventoryComponent } from '../inventory/inventory.component';

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.scss']
})
export class InventoryEditComponent implements OnInit {

  constructor(private inventoryService: InventoryService,
              private route: ActivatedRoute, 
              private router: Router) { }

  public inventoryItemFetch: boolean = false;
  public inventoryItemError: any = null;
  public inventoryItemWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);  
  public formComponent: InventoryComponent | undefined;

  ngOnInit(): void {

  var id = this.route.snapshot.paramMap.get('id');

  setTimeout(() => {
    if (!this.inventoryItemFetch && 
        this.inventoryItemError === null){
          this.inventoryItemWaiting = true;  
    }        
  }, 1000);    
  this.inventoryService.inventoriesById(id!).subscribe({
    next: (res) => {
      this.inventoryItemFetch = true;
      this.formComponent!.populateData(res);
      var configure : any = {
        disableInputs: false,
      }
      this.formComponent!.populateConfig(configure);
      this.inventoryItemWaiting = false;
    },
    error: (error) => {
      if (error.status === 401){
        this.router.navigateByUrl('login');
      }
      this.inventoryItemError = error;
      this.inventoryItemWaiting = false;
      },
    }); 

  }

  public setFormComponent(formComponent: InventoryComponent){
    this.formComponent = formComponent;
  }

  public sendData(id: number, form: FormGroup):void{

    this.inventoryService
    .inventoriesEdit(id, form.value)    
    .subscribe({
    next: (res) => {this.router.navigateByUrl('inventories')},
    error: (error) => { 
                        if (error.status === 401){
                          this.router.navigateByUrl('login');
                        }
                        console.log(error) 
                      }
    });                  

  }

}
