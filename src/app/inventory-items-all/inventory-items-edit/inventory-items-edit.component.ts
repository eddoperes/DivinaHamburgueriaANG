//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';

//form
import { InventoryItemsComponent } from '../inventory-items/inventory-items.component';

@Component({
  selector: 'app-inventory-items-edit',
  templateUrl: './inventory-items-edit.component.html',
  styleUrls: ['./inventory-items-edit.component.scss']
})
export class InventoryItemsEditComponent implements OnInit {

  constructor(private inventoryItemsService: InventoryItemsService,
              private route: ActivatedRoute, 
              private router: Router) { }

  public inventoryItemFetch: boolean = false;
  public inventoryItemError: any = null;
  public inventoryItemWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);  
  public formComponent: InventoryItemsComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.inventoryItemFetch && 
          this.inventoryItemError === null){
        this.inventoryItemWaiting = true;  
      }        
    }, 1000);    
    this.inventoryItemsService.itensDoEstoqueById(id!).subscribe({
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

  public setFormComponent(formComponent: InventoryItemsComponent){
    this.formComponent = formComponent;
  }
  
  public sendData(id: number, form: FormGroup):void{
    
    this.inventoryItemsService
        .itensDoEstoqueEdit(id, form.value)    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('inventoryitems')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }
  
}
