//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

//data
import { MenuItemsRecipeService } from 'src/app/services/menu-items-recipe.service';

//form
import { MenuItemsRecipeComponent } from '../menu-items-recipe/menu-items-recipe.component';

@Component({
  selector: 'app-menu-items-recipe-new',
  templateUrl: './menu-items-recipe-new.component.html',
  styleUrls: ['./menu-items-recipe-new.component.scss']
})
export class MenuItemsRecipeNewComponent implements OnInit {

  constructor(private menuItemsRecipeService: MenuItemsRecipeService, 
              private router: Router) { }

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: MenuItemsRecipeComponent){    
    var configure:any = {
      disableInputs: false,
    }
    formComponent.populateConfig(configure);
  }

  public sendData(id: number, form: FormGroup):void{
  
    this.menuItemsRecipeService
        .menuItemRecipeNew(id, form.value)    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('menuitemsrecipe')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}
