//angular
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { MenuItemResale } from '../../module/menuItemResale';
import { InventoryItem } from '../../module/inventoryItem';
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';

@Component({
  selector: 'app-menu-items-resale',
  templateUrl: './menu-items-resale.component.html',
  styleUrls: ['./menu-items-resale.component.scss']
})
export class MenuItemsResaleComponent implements OnInit {

  public menuItemResaleForm: FormGroup = this.formBuilder.group({
    id: 0,
    name: "",
    description: "",
    photo: "",
    inventoryItemId: 0
  });

  @Input() sendData: (id: number, form: FormGroup) => void = () => {};
  @Input() setFormComponent : (formComponent: MenuItemsResaleComponent) => void = () => {};

  public inventoryItems: Array<InventoryItem> = [];
  public inventoryItemsError: any = null;
  public inventoryItemsWaiting: boolean = false;

  public nameError : string = "";
  public descriptionError : string = "";
  public photoError : string = "";
  public inventoryItemError : string = "";

  public newOrEdit: boolean = true;

  constructor(private inventoryItemsService: InventoryItemsService,
              private router: Router,
              private formBuilder: FormBuilder) { }

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

  public populateData(item: MenuItemResale){
    this.menuItemResaleForm = this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      description: [item.description],
      photo: [item.photo],
      inventoryItemId: [item.inventoryItemId]
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.menuItemResaleForm.controls['name'].disable();
      this.menuItemResaleForm.controls['description'].disable();
      this.menuItemResaleForm.controls['photo'].disable();
      this.menuItemResaleForm.controls['inventoryItemId'].disable();
      this.newOrEdit = false;
    }
  }

  public isDependecyReady() : boolean{
    if (this.inventoryItems.length === 0)
      return false;
    return true;
  }

  public handlePersistence(){  
    this.nameError = "";
    this.descriptionError = "";
    this.photoError = "";
    this.inventoryItemError = "";
    if (this.menuItemResaleForm.valid) {     
      this.sendData(this.menuItemResaleForm.controls['id'].value, 
                    this.menuItemResaleForm)
    }
    else {
      if (this.menuItemResaleForm.get('name')?.errors?.['required'] !== undefined){
        this.nameError= "* o nome é requerido.";
      }
      if (this.menuItemResaleForm.get('name')?.errors?.['minlength'] !== undefined){
        this.nameError= "* o nome precisa ter 3 letras ou mais.";
      }

      if (this.menuItemResaleForm.get('description')?.errors?.['required'] !== undefined){
        this.nameError= "* a descrição é requerido.";
      }

      if (this.menuItemResaleForm.get('photo')?.errors?.['required'] !== undefined){
        this.nameError= "* a photo é requerida.";
      }

      if (this.menuItemResaleForm.get('inventoryItemId')?.errors?.['required'] !== undefined){
        this.inventoryItemError= "* a unidade é requerida.";
      }
    }
  }  

}
