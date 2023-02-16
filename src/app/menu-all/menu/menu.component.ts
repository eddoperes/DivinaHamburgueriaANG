//angular
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

//data
import { Menu } from '../../module/menu';
import { MenuItemRecipe } from '../../module/menuItemRecipe';
import { MenuItemsRecipeService } from 'src/app/services/menu-items-recipe.service';
import { MenuItemResale } from '../../module/menuItemResale';
import { MenuItemsResaleService } from 'src/app/services/menu-items-resale.service';

//form
import { MenuMenuItemComponent } from './menu-menu-item/menu-menu-item.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuForm: FormGroup = this.formBuilder.group({
    id : 0,
    name : '',
    description : '',
    state : 0
  });

  @ViewChild("menuItemsContainer", { read: ViewContainerRef }) menuItemsContainer: any;

  @Input() sendData: (id: number, form: any) => void = () => {};
  @Input() setFormComponent : (formComponent: MenuComponent) => void = () => {};

  public menuItemsRecipe: Array<MenuItemRecipe> = [];
  public menuItemsRecipeError: any = null;
  public menuItemsRecipeWaiting: boolean = false;

  public menuItemsResale: Array<MenuItemResale> = [];
  public menuItemsResaleError: any = null;
  public menuItemsResaleWaiting: boolean = false;  

  public nameError : string = "";
  public descriptionError : string = "";
  
  public menuItemsInstances: Array<any> = [];
  public newOrEdit: boolean = true;
  public accordionPanelStyle: string = '';
  public disableItemsButtons = false;

  constructor(private menuItemsRecipeService: MenuItemsRecipeService,
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

  public populateData(item: Menu){
    this.menuForm = this.formBuilder.group({
      id : [item.id],
      name : [item.name],
      description : [item.description],
      state : [item.state]
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
      for(var i=0; i < item.menuMenuItems.length; i++){
          var component = this.menuItemsContainer.createComponent(MenuMenuItemComponent);
          component.instance.menuItems = menuItems;
          component.instance.number = this.menuItemsInstances.length;
          component.instance.populateData(item.menuMenuItems[i]);
          this.menuItemsInstances.push(component.instance);
      }     
    }, 100);
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.menuForm.controls['name'].disable();
      this.menuForm.controls['description'].disable();
      this.menuForm.controls['state'].disable();
      this.newOrEdit = false;
      setTimeout(() => {
        for(var i=0; i < this.menuItemsInstances.length; i++){
          this.menuItemsInstances[i].getSubForm().controls['menuItemId'].disable();
          this.menuItemsInstances[i].getSubForm().controls['price'].disable();
          this.menuItemsInstances[i].getSubForm().controls['state'].disable();          
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
    var component = this.menuItemsContainer.createComponent(MenuMenuItemComponent);
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
    component.instance.menuItems = menuItems;
    component.instance.number = this.menuItemsInstances.length;
    this.menuItemsInstances.push(component.instance);    
  }

  public isDependecyReady() : boolean{
    if (this.menuItemsRecipe.length === 0)
      return false;
    if (this.menuItemsResale.length === 0)
      return false;
    return true;
  }

  public handlePersistence(){ 
    
    var isValid : boolean = true;

    if (this.menuForm.valid) {    
      this.nameError = "";
      this.descriptionError = "";
    } else {
      if (this.menuForm.get('name')?.errors?.['required'] !== undefined){
        this.nameError= "* o nome é requerido.";
      }  
      if (this.menuForm.get('description')?.errors?.['required'] !== undefined){
        this.descriptionError= "* a descrição é requerida.";
      }  
      isValid = false;
    }

    for(var i=0; i < this.menuItemsInstances.length; i++){ 
      var subForm = this.menuItemsInstances[i].getSubForm();  
      if (subForm !== null){  
        if (subForm.valid){
          this.menuItemsInstances[i].priceError = "";
        } else {
          if (subForm.get('price')?.errors?.['required'] !== undefined){
            this.menuItemsInstances[i].priceError = "* o preço mínimo é 1.";
          }            
          isValid = false;
        }
      }        
    }
    
    if (!isValid){
      return;
    }
    
    var menu : Menu = this.menuForm.value;
    menu.state & 1 ? menu.state = 1 : menu.state = 0;
    menu.menuMenuItems = [];    
    for(var i=0; i < this.menuItemsInstances.length; i++){
      var subForm = this.menuItemsInstances[i].getSubForm(); 
      if (subForm !== null){
        var menuItem = subForm.value;
        menuItem.state & 1 ? menuItem.state = 1 : menuItem.state = 0;
        menu.menuMenuItems.push(menuItem);
      }        
    }  

    this.sendData(this.menuForm.controls['id'].value, 
                  menu);

  } 

}
