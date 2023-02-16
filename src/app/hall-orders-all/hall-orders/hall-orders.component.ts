//angular
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

//data
import { HallOrder } from '../../module/hallOrder';
import { MenuItemRecipe } from '../../module/menuItemRecipe';
import { MenuItemsRecipeService } from 'src/app/services/menu-items-recipe.service';
import { MenuItemResale } from '../../module/menuItemResale';
import { MenuItemsResaleService } from 'src/app/services/menu-items-resale.service';
import { Customer } from '../../module/customer';
import { CustomersService } from 'src/app/services/customers.service';

//form
import { HallOrdersMenuItemsComponent } from './hall-orders-menu-items/hall-orders-menu-items.component';

@Component({
  selector: 'app-hall-orders',
  templateUrl: './hall-orders.component.html',
  styleUrls: ['./hall-orders.component.scss']
})
export class HallOrdersComponent implements OnInit {

  public hallOrderForm: FormGroup = this.formBuilder.group({
    id : 0,
    customerId : null,
    userId: 0,
    state: 1,
    observation: "",
    total: 0, 
  });

  @ViewChild("menuItemsContainer", { read: ViewContainerRef }) menuItemsContainer: any;

  @Input() sendData: (id: number, form: any) => void = () => {};
  @Input() setFormComponent : (formComponent: HallOrdersComponent) => void = () => {};

  public menuItemsRecipe: Array<MenuItemRecipe> = [];
  public menuItemsRecipeError: any = null;
  public menuItemsRecipeWaiting: boolean = false;

  public menuItemsResale: Array<MenuItemResale> = [];
  public menuItemsResaleError: any = null;
  public menuItemsResaleWaiting: boolean = false;

  public totalError : string = "";
  
  public menuItemsInstances: Array<any> = [];
  public newOrEdit: boolean = true;
  public accordionPanelStyle: string = '';
  public disableItemsButtons = false;

  constructor(private customersService: CustomersService,
              private menuItemsRecipeService: MenuItemsRecipeService,
              private menuItemsResaleService: MenuItemsResaleService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {

    this.setFormComponent(this);

    setTimeout(() => {
      if (this.menuItemsRecipe.length === 0 && 
          this.menuItemsRecipeError === null){
        this.menuItemsRecipeWaiting = true;  
      }        
    }, 1000); 
    this.menuItemsRecipeService.menuItemsRecipe().subscribe({      
      next : (res) => {
                        this.menuItemsRecipe = res; 
                        this.menuItemsRecipeWaiting = false;
                      },
      error : (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.menuItemsRecipeError = error;
                          this.menuItemsRecipeWaiting = false;
                         } 
    }); 

    setTimeout(() => {
      if (this.menuItemsResale.length === 0 && 
          this.menuItemsResaleError === null){
        this.menuItemsResaleWaiting = true;  
      }        
    }, 1000); 
    this.menuItemsResaleService.menuItemsResale().subscribe({      
      next : (res) => {
                        this.menuItemsResale = res; 
                        this.menuItemsResaleWaiting = false;
                      },
      error : (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.menuItemsResaleError = error;
                          this.menuItemsResaleWaiting = false;
                         } 
    });

  }

  public populateData(item: HallOrder){
    this.hallOrderForm = this.formBuilder.group({
      id: [item.id],
      customerId : [item.customerId],
      userId : [item.userId],
      state: [item.state],
      observation: [item.observation],
      total: [item.total], 
    });
    setTimeout(() => {
      var menuItems: any = [];
      for(var i=0; i < this.menuItemsRecipe.length; i++) {
        menuItems.push({
          id: this.menuItemsRecipe[i].id,
          name: this.menuItemsRecipe[i].name
        });
      }
      for(var i=0; i < this.menuItemsResale.length; i++) {
        menuItems.push({
          id: this.menuItemsResale[i].id,
          name: this.menuItemsResale[i].name
        });
      }
      for(var i=0; i < item.hallOrderMenuItems.length; i++){      
          var component = this.menuItemsContainer.createComponent(HallOrdersMenuItemsComponent);          
          component.instance.menuItems = menuItems;
          component.instance.number = this.menuItemsInstances.length;
          component.instance.populateData(item.hallOrderMenuItems[i]);
          this.menuItemsInstances.push(component.instance);
      }     
    }, 100);
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.hallOrderForm.controls['customerId'].disable();
      this.hallOrderForm.controls['observation'].disable();
      this.hallOrderForm.controls['total'].disable();
      this.newOrEdit = false;
      setTimeout(() => {
        for(var i=0; i < this.menuItemsInstances.length; i++){
          this.menuItemsInstances[i].getSubForm().controls['menuItemId'].disable();
          this.menuItemsInstances[i].getSubForm().controls['price'].disable();
          this.menuItemsInstances[i].getSubForm().controls['observation'].disable();          
        }     
      }, 100);
    }   
    this.disableItemsButtons = configure.disableInputs;
    setTimeout(() => {
      for(var i=0; i < this.menuItemsInstances.length; i++){
        this.menuItemsInstances[i].disableItemsButtons = configure.disableInputs;     
      }    
    }, 100);
    this.accordionPanelStyle = 'display:block';
  }

  public newItem (e : any): void  {
    e.preventDefault();    

    var menuItems: any = [];
    for(var i=0; i < this.menuItemsRecipe.length; i++) {
      menuItems.push({
        id: this.menuItemsRecipe[i].id,
        name: this.menuItemsRecipe[i].name
      });
    }
    for(var i=0; i < this.menuItemsResale.length; i++) {
      menuItems.push({
        id: this.menuItemsResale[i].id,
        name: this.menuItemsResale[i].name
      });
    }

    var component = this.menuItemsContainer.createComponent(HallOrdersMenuItemsComponent);
    component.instance.menuItems = menuItems;
    component.instance.number = this.menuItemsInstances.length;
    this.menuItemsInstances.push(component.instance);    
  }

  public isDependecyReady() : boolean{
    //if (this.customers.length === 0)
    //  return false;
    return true;
  }

  public handlePersistence(){ 
    
    var isValid : boolean = true;

    if (this.hallOrderForm.valid) {    
      this.totalError= "";
    } else {
      if (this.hallOrderForm.get('total')?.errors?.['min'] !== undefined){
        this.totalError= "* o total mínimo é 1.";
      }  
      isValid = false;
    }

    for(var i=0; i < this.menuItemsInstances.length; i++){ 
      var subForm = this.menuItemsInstances[i].getSubForm();  
      if (subForm !== null){  
        if (subForm.valid){
          this.menuItemsInstances[i].unitPriceError = "";
          this.menuItemsInstances[i].quantityError = "";
          this.menuItemsInstances[i].totalPriceError = "";
        } else {
          if (subForm.get('unitPrice')?.errors?.['min'] !== undefined){
            this.menuItemsInstances[i].unitPriceError = "* o preço unitário mínimo é 1.";
          }  
          if (subForm.get('quantity')?.errors?.['min'] !== undefined){
            this.menuItemsInstances[i].quantityError = "* a quantidade mínima é 1.";
          }  
          if (subForm.get('totalPrice')?.errors?.['min'] !== undefined){
            this.menuItemsInstances[i].totalPriceError = "* a preço total mínimo é 1.";
          }  
          isValid = false;
        }
      }        
    }
    
    if (!isValid){
      return;
    }

    var hallOrder : HallOrder = this.hallOrderForm.value;
    hallOrder.hallOrderMenuItems = [];    
    for(var i=0; i < this.menuItemsInstances.length; i++){
      var subForm = this.menuItemsInstances[i].getSubForm(); 
      if (subForm !== null)
        hallOrder.hallOrderMenuItems.push(subForm.value);
    }    

    //console.log(hallOrder);

    this.sendData(this.hallOrderForm.controls['id'].value, 
                  hallOrder);

  }  

}
