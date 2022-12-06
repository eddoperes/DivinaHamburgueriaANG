//data
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';

//form
import { InventoryItemsComponent } from '../inventory-items/inventory-items.component';

@Component({
  selector: 'app-inventory-items-remove',
  templateUrl: './inventory-items-remove.component.html',
  styleUrls: ['./inventory-items-remove.component.scss']
})
export class InventoryItemsRemoveComponent implements OnInit {

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
          disableInputs: true,
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

  public setFormComponent(component: InventoryItemsComponent){
    this.formComponent = component;
  }

  public sendData(id: number, form: FormGroup):void{
    
    this.inventoryItemsService
        .itensDoEstoqueDelete(id)    
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
