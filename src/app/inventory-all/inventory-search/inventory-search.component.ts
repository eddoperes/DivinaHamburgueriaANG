//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { Eatable } from '../../module/eatable';
import { Unit } from '../../module/unit';
import { UnitsService } from 'src/app/services/units.service';
import { InventoryItem } from '../../module/inventoryItem';
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';
import { Inventory } from '../../module/inventory';
import { InventoryService } from 'src/app/services/inventory.service';

//search
import { InventoryFilter } from 'src/app/module/inventoryFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-inventory-search',
  templateUrl: './inventory-search.component.html',
  styleUrls: ['./inventory-search.component.scss']
})
export class InventorySearchComponent implements OnInit {

  public filter: InventoryFilter = {
    eatable: "",
    eatableDisabled: false,
  }

  public inventories: Array<Inventory> = [];
  public hasInventoriesAnswer: boolean = false;
  public inventoriesError: any = null;
  public inventoriesWaiting: boolean = false;
  public eatables: Array<Eatable> = [];  
  public eatablesError: any = null;
  public eatablesWaiting: boolean = false;

  public inventoryItems: Array<InventoryItem> = [];  
  public inventoryItemsError: any = null;
  public inventoryItemsWaiting: boolean = false;

  public units: Array<Unit> = [];  
  public unitsError: any = null;
  public unitsWaiting: boolean = false;

  public getInventoryItemName(id: number): string{
    if (this.inventoryItems.length === 0)
      return ''      
    return this.inventoryItems.filter(e => e.id === id)[0].name
  }

  public getUnityName(inventoryItemid: number): string{
    if (this.units.length === 0)
      return ''
    var inventoryItem : InventoryItem = this.inventoryItems.filter(e => e.id === inventoryItemid)[0]
    if (inventoryItem === null || inventoryItem == undefined)
      return ''
    return this.units.filter(u => u.id === inventoryItem.unityId )[0].name
  }

  constructor(private inventoryService: InventoryService,
              private unitsService: UnitsService,
              private inventoryItemsService: InventoryItemsService,
              private localStorageService : LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {
    
    setTimeout(() => {
      if (this.eatables.length === 0 && 
          this.eatablesError === null){
        this.eatablesWaiting = true;  
      }        
    }, 1000); 
    this.inventoryItemsService.distinctNames().subscribe({      
      next : (res) => {
                        this.eatables = res; 
                        this.eatablesWaiting = false;
                      },
      error : (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.eatablesError = error;
                          this.eatablesWaiting = false;
                         } 
    }); 

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

    setTimeout(() => {
      if (this.units.length === 0 && 
          this.unitsError === null){
        this.unitsWaiting = true;  
      }        
    }, 1000); 
    this.unitsService.unidades().subscribe({      
      next : (res) => {
                        this.units = res; 
                        this.unitsWaiting = false;
                      },
      error : (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.unitsError = error;
                          this.unitsWaiting = false;
                         } 
    }); 
    
    this.filter.eatable = this.localStorageService.get("eatable");        
    if (this.filter.eatable === '')
      return;
    this.filter.eatableDisabled = this.localStorageService.get("eatableDisabled");

    var eatable;
    if (this.filter.eatableDisabled)
      eatable = "";
    else
      eatable = this.filter.eatable;    

    this.executeSubmit(eatable);
    
  }

  public eatableSpecificChange( event: any){  
    this.filter.eatableDisabled = false;
  }

  public eatableAnyChange( event: any){
    this.filter.eatableDisabled = true;
  }

  public handleSubmit(form: any){

    this.localStorageService.set("eatable", this.filter.eatable);
    this.localStorageService.set("eatableDisabled", this.filter.eatableDisabled);

    var eatable;
    if (this.filter.eatableDisabled)
      eatable = "";
    else
      eatable = form.value.eatable;
   
    this.executeSubmit(eatable);
    
  }

  private executeSubmit(eatableId: string){

    this.hasInventoriesAnswer = false;
    setTimeout(() => {
      if (!this.hasInventoriesAnswer){
        this.inventoriesWaiting = true; 
      }        
    }, 1000); 

    this.inventoryService.inventoriesByEatable(eatableId).subscribe({
      next: (res) => {
                        this.inventories = res;
                        this.inventoriesWaiting = false;
                        this.hasInventoriesAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.inventoriesError = error;
                          this.inventoriesWaiting = false;
                          this.hasInventoriesAnswer = true;
                        },
    }); 

  }

}
