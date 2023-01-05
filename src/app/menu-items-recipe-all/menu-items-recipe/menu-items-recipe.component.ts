//angular
import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { MenuItemRecipe } from '../../module/menuItemRecipe';
import { Eatable } from 'src/app/module/eatable';
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';
import { UnitsService } from 'src/app/services/units.service';

//form
import { IngredientsComponent } from './ingredients/ingredients.component';
import { Ingredient } from 'src/app/module/ingredient';

@Component({
  selector: 'app-menu-items-recipe',
  templateUrl: './menu-items-recipe.component.html',
  styleUrls: ['./menu-items-recipe.component.scss']
})
export class MenuItemsRecipeComponent implements OnInit {

  public menuItemRecipeForm: FormGroup = this.formBuilder.group({
    id: 0,
    name: "",
    description: "",
    photo: ""
  });

  @ViewChild("ingredientsContainer", { read: ViewContainerRef }) ingredientsContainer: any;

  @Input() sendData: (id: number, form: FormGroup) => void = () => {};
  @Input() setFormComponent : (formComponent: MenuItemsRecipeComponent) => void = () => {};

  public eatables: Array<Eatable> = [];
  public eatablesError: any = null;
  public eatablesWaiting: boolean = false;

  public units: Array<Eatable> = [];
  public unitsError: any = null;
  public unitsWaiting: boolean = false;

  public nameError : string = "";
  public descriptionError : string = "";
  public photoError : string = "";

  public ingredientsInstances: Array<any> = [];
  public newOrEdit: boolean = true;
  public accordionPanelStyle: string = '';
  public disableItemsButtons = false;

  constructor(private inventoryItemsService: InventoryItemsService,
              private unitsService: UnitsService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.setFormComponent(this);

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

  }

  public populateData(item: MenuItemRecipe){
    this.menuItemRecipeForm = this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      description: [item.description],
      photo: [item.photo],      
    });
    setTimeout(() => {
      for(var i=0; i < item.ingredients.length; i++){
          var component = this.ingredientsContainer.createComponent(IngredientsComponent);
          component.instance.eatables = this.eatables;
          component.instance.number = this.eatables.length;
          component.instance.units = this.units;
          component.instance.populateData(item.ingredients[i]);
          this.ingredientsInstances.push(component.instance);
      }     
    }, 100);
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.menuItemRecipeForm.controls['name'].disable();
      this.menuItemRecipeForm.controls['description'].disable();
      this.menuItemRecipeForm.controls['photo'].disable();
      this.newOrEdit = false;
      setTimeout(() => {
        for(var i=0; i < this.ingredientsInstances.length; i++){
          this.ingredientsInstances[i].getSubForm().controls['eatableId'].disable();
          this.ingredientsInstances[i].getSubForm().controls['quantity'].disable();
          this.ingredientsInstances[i].getSubForm().controls['unitId'].disable();
        }     
      }, 100);
    }

    this.disableItemsButtons = configure.disableInputs;
    setTimeout(() => {
      for(var i=0; i < this.ingredientsInstances.length; i++){
        this.ingredientsInstances[i].disableItemsButtons = configure.disableInputs;     
      }    
    }, 100);
    this.accordionPanelStyle = 'display:block';

  }

  public AccordionClick(e : any): void {
    e.preventDefault();
    e.target.classList.toggle("active");
    var panel = e.target?.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }

  public newItem (e : any): void  {
    e.preventDefault();    
    var component = this.ingredientsContainer.createComponent(IngredientsComponent);
    component.instance.eatables= this.eatables;
    component.instance.number = this.ingredientsInstances.length;
    component.instance.units= this.units;
    this.ingredientsInstances.push(component.instance);    
  }

  public isDependecyReady() : boolean{
    if (this.eatables.length === 0)
      return false;
    return true;
  }

  public handlePersistence(){  

    var isValid : boolean = true;

    if (this.menuItemRecipeForm.valid) {     
      this.nameError = "";
      this.descriptionError = "";
      this.photoError = "";
    }
    else {
      if (this.menuItemRecipeForm.get('name')?.errors?.['required'] !== undefined){
        this.nameError= "* o nome é requerido.";
      }
      if (this.menuItemRecipeForm.get('name')?.errors?.['minlength'] !== undefined){
        this.nameError= "* o nome precisa ter 3 letras ou mais.";
      }
      if (this.menuItemRecipeForm.get('description')?.errors?.['required'] !== undefined){
        this.descriptionError= "* a descrição é requerida.";
      }
      if (this.menuItemRecipeForm.get('photo')?.errors?.['required'] !== undefined){
        this.photoError= "* a foto é requerida.";
      }
      isValid = false;
    }

    for(var i=0; i < this.ingredientsInstances.length; i++){ 
      var subForm = this.ingredientsInstances[i].getSubForm();  
      if (subForm !== null){  
        if (subForm.valid){
          this.ingredientsInstances[i].eatablesError = "";
          this.ingredientsInstances[i].quantityError = "";
          this.ingredientsInstances[i].unitsError = "";
        } else {
          if (subForm.get('eatableId')?.errors !== undefined){
            this.ingredientsInstances[i].eatablesError = "* o comestivel é requerido.";
          }  
          if (subForm.get('quantity')?.errors !== undefined){
            this.ingredientsInstances[i].quantityError = "* a quantidade mínima é 1.";
          }  
          if (subForm.get('totalPrice')?.errors !== undefined){
            this.ingredientsInstances[i].unitsError = "* a unidade é requerida.";
          }  
          isValid = false;
        }
      }        
    }

    if (!isValid){
      return;
    }

    var menuItemRecipe : MenuItemRecipe = this.menuItemRecipeForm.value;
    menuItemRecipe.ingredients = [];    
    for(var i=0; i < this.ingredientsInstances.length; i++){
      var subForm = this.ingredientsInstances[i].getSubForm(); 
      if (subForm !== null)
        menuItemRecipe.ingredients.push(subForm.value);
    } 

    //console.log(menuItemRecipe);

    this.sendData(this.menuItemRecipeForm.controls['id'].value, 
                  this.menuItemRecipeForm)

  }  

}
