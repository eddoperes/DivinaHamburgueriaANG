//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { MenuItemRecipe } from '../../module/menuItemRecipe';
import { MenuItemsRecipeService } from 'src/app/services/menu-items-recipe.service';

//search
import { MenuItemRecipeFilter } from 'src/app/module/menuItemRecipeFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-menu-items-recipe-search',
  templateUrl: './menu-items-recipe-search.component.html',
  styleUrls: ['./menu-items-recipe-search.component.scss']
})
export class MenuItemsRecipeSearchComponent implements OnInit {

  public filter: MenuItemRecipeFilter = {
    name: '',
    nameDisabled: false
  }

  public menuItemsRecipe: Array<MenuItemRecipe> = [];
  public hasMenuItemsRecipeAnswer: boolean = false;
  public menuItemsRecipeError: any = null;
  public menuItemsRecipeWaiting: boolean = false;

  constructor(private menuItemsRecipeService: MenuItemsRecipeService,
              private localStorageService : LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {

    this.filter.name = this.localStorageService.get("name");
    this.filter.nameDisabled = this.localStorageService.get("nameDisabled");

    var name;
    if (this.filter.nameDisabled)
      name = "";
    else
      name = this.filter.name;
   
    this.executeSubmit(name);

  }

  public nameSpecificChange( event: any){
    this.filter.nameDisabled = false;
  }

  public nameAnyChange( event: any){
    this.filter.nameDisabled = true;
  }

  public handleSubmit(form: any){

    this.localStorageService.set("name", this.filter.name);
    this.localStorageService.set("nameDisabled", this.filter.nameDisabled);

    var name;
    if (this.filter.nameDisabled)
      name = "";
    else
      name = form.value.name;

    this.executeSubmit(name);
    
  }

  private executeSubmit(name: string){

    this.hasMenuItemsRecipeAnswer = false;
    setTimeout(() => {
      if (!this.hasMenuItemsRecipeAnswer){
        this.menuItemsRecipeWaiting = true; 
      }        
    }, 1000); 

    this.menuItemsRecipeService.menuItemsRecipeByName(name).subscribe({
      next: (res) => {
                        this.menuItemsRecipe = res;
                        this.menuItemsRecipeWaiting = false;
                        this.hasMenuItemsRecipeAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.menuItemsRecipeError = error;
                          this.menuItemsRecipeWaiting = false;
                          this.hasMenuItemsRecipeAnswer = true;
                        },
    }); 

  }

}
