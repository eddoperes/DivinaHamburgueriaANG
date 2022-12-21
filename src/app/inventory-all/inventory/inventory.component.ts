//angular
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { Inventory } from '../../module/inventory';
import { InventoryItem } from '../../module/inventoryItem';
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public inventoryForm: FormGroup = this.formBuilder.group({
    id: 0,
    inventoryItemId: 0,
    quantity: 0      
  });

  @Input() sendData: (id: number, form: FormGroup) => void = () => {};
  @Input() setFormComponent : (formComponent: InventoryComponent) => void = () => {};

  public inventoryItems: Array<InventoryItem> = [];
  public inventoryItemsError: any = null;
  public inventoryItemsWaiting: boolean = false;

  public inventoryItemError : string = "";
  public quantityError : string = "";

  public newOrEdit: boolean = true;

  constructor(private inventoryItemsService: InventoryItemsService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.setFormComponent(this);

    setTimeout(() => {
      if (this.inventoryItems.length === 0 && 
          this.inventoryItemsError === null){
        this.inventoryItemsWaiting = true;  
      }        
    }, 1000); 
    this.inventoryItemsService.itensDoEstoque().subscribe({      
      next : (res) => {
                        this.inventoryItems = res; 
                        this.inventoryItemsWaiting = false;
                      },
      error : (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.inventoryItemsError = error;
                          this.inventoryItemsWaiting = false;
                         } 
    });

  }

  public populateData(item: Inventory){
    this.inventoryForm = this.formBuilder.group({
      id: [item.id],
      inventoryItemId: [item.inventoryItemId],
      quantity: [item.quantity]
    });
  }

  public populateConfig(configure: any){
    this.inventoryForm.controls['inventoryItemId'].disable();
    if (configure.disableInputs){
      //this.inventoryForm.controls['id'].disable();      
      this.inventoryForm.controls['quantity'].disable();
      this.newOrEdit = false;
    }
  }

  public isDependecyReady() : boolean{
    if (this.inventoryItems.length === 0)
      return false;
    return true;
  }

  public handlePersistence(){  
    this.inventoryItemError = "";
    this.quantityError = "";  
    if (this.inventoryForm.valid) {        
      this.inventoryForm.controls['inventoryItemId'].enable();
      this.sendData(this.inventoryForm.controls['id'].value, 
                    this.inventoryForm)
    }
    else {    
      if (this.inventoryForm.get('inventoryItemId')?.errors?.['required'] !== undefined){
        this.inventoryItemError= "* o item do estoque é requerido.";
      }
      if (this.inventoryForm.get('quantity')?.errors?.['min'] !== undefined){
        this.quantityError= "* a quantidade precisa ser maior que 1.";
      } 
    }
  }  

}
