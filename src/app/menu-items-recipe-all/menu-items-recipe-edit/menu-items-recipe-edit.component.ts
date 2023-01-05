//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { MenuItemsRecipeService } from 'src/app/services/menu-items-recipe.service';

//form
import { MenuItemsRecipeComponent } from '../menu-items-recipe/menu-items-recipe.component';

@Component({
  selector: 'app-menu-items-recipe-edit',
  templateUrl: './menu-items-recipe-edit.component.html',
  styleUrls: ['./menu-items-recipe-edit.component.scss']
})
export class MenuItemsRecipeEditComponent implements OnInit {

  constructor(private menuItemsRecipeService: MenuItemsRecipeService,
              private route: ActivatedRoute, 
              private router: Router) { }

  public menuItemRecipeFetch: boolean = false;
  public menuItemRecipeError: any = null;
  public menuItemRecipeWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);  
  public formComponent: MenuItemsRecipeComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.menuItemRecipeFetch && 
          this.menuItemRecipeError === null){
        this.menuItemRecipeWaiting = true;  
      }        
    }, 1000);    
    this.menuItemsRecipeService.menuItemRecipeById(id!).subscribe({
      next: (res) => {
        this.menuItemRecipeFetch = true;
        this.formComponent!.populateData(res);
        var configure : any = {
          disableInputs: false,
        }
        this.formComponent!.populateConfig(configure);
        this.menuItemRecipeWaiting = false;
      },
      error: (error) => {
          if (error.status === 401){
            this.router.navigateByUrl('login');
          }
          this.menuItemRecipeError = error;
          this.menuItemRecipeWaiting = false;
        },
    }); 

  }


  public setFormComponent(formComponent: MenuItemsRecipeComponent){
    this.formComponent = formComponent;
  }
  
  public sendData(id: number, form: FormGroup):void{
    
    this.menuItemsRecipeService
        .menuItemRecipeEdit(id, form.value)    
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
