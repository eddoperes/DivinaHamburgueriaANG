//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { Unit } from '../../module/unit';
import { UnitsService } from 'src/app/services/units.service';
import { InventoryItem } from '../../module/inventoryItem';
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';

//search
import { InventoryItemFilter } from 'src/app/module/inventoryItemFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-inventory-items-search',
  templateUrl: './inventory-items-search.component.html',
  styleUrls: ['./inventory-items-search.component.scss']
})
export class InventoryItemsSearchComponent implements OnInit {

  public filter: InventoryItemFilter = {
    name: '',
    nameDisabled: false,
    type: '1',
    typeDisabled: false
  }

  public itensdoestoque: Array<InventoryItem> = [];
  public hasInventoryAnswer: boolean = false;
  public inventoryItemsError: any = null;
  public inventoryItemsWaiting: boolean = false;
  public unidades: Array<Unit> = [];  
  public unitsError: any = null;
  public unitsWaiting: boolean = false;

  public getUnityName(id: number): string{
    if (this.unidades.length === 0)
      return ''
    return this.unidades.filter(u => u.id === id)[0].name
  }

  public getTypeName(id: number): string{
    if (id === 1)
      return "Receita"
    else if (id === 2)
      return "Revenda"
    else
      return ''    
  }

  constructor(private inventoryItemsService: InventoryItemsService,
              private unitsService: UnitsService,
              private localStorageService : LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {
    
    setTimeout(() => {
      if (this.unidades.length === 0 && 
          this.unitsError === null){
        this.unitsWaiting = true;  
      }        
    }, 1000); 
    this.unitsService.unidades().subscribe({      
      next : (res) => {
                        this.unidades = res; 
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

    this.filter.name = this.localStorageService.get("name");
    this.filter.type = this.localStorageService.get("type");
    this.filter.nameDisabled = this.localStorageService.get("nameDisabled");
    this.filter.typeDisabled = this.localStorageService.get("typeDisabled");

    var name;
    if (this.filter.nameDisabled)
      name = "";
    else
      name = this.filter.name;
    var type;
    if (this.filter.typeDisabled)
      type = "";
    else
      type = this.filter.type;

    this.executeSubmit(name, type);

  }

  public typeSpecificChange( event: any){  
    this.filter.typeDisabled = false;
  }

  public nameSpecificChange( event: any){
    this.filter.nameDisabled = false;
  }

  public typeAnyChange( event: any){
    this.filter.typeDisabled = true;
  }

  public nameAnyChange( event: any){
    this.filter.nameDisabled = true;
  }

  public handleSubmit(form: any){

    this.localStorageService.set("name", this.filter.name);
    this.localStorageService.set("type", this.filter.type);
    this.localStorageService.set("nameDisabled", this.filter.nameDisabled);
    this.localStorageService.set("typeDisabled", this.filter.typeDisabled);

    var name;
    if (this.filter.nameDisabled)
      name = "";
    else
      name = form.value.name;
    var type;
    if (this.filter.typeDisabled)
      type = "";
    else
      type = form.value.type;

    this.executeSubmit(name, type);
    
  }

  private executeSubmit(name: string, type: string){

    this.hasInventoryAnswer = false;
    setTimeout(() => {
      if (!this.hasInventoryAnswer){
        this.inventoryItemsWaiting = true; 
      }        
    }, 1000); 

    this.inventoryItemsService.itensDoEstoqueByNameAndOrType(name, type).subscribe({
      next: (res) => {
                        this.itensdoestoque = res;
                        this.inventoryItemsWaiting = false;
                        this.hasInventoryAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.inventoryItemsError = error;
                          this.inventoryItemsWaiting = false;
                          this.hasInventoryAnswer = true;
                        },
    }); 

  }

}
