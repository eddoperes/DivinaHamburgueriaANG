//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { MenuItemResale } from '../../module/menuItemResale';
import { MenuItemsResaleService } from 'src/app/services/menu-items-resale.service';

//search
import { MenuItemResaleFilter } from 'src/app/module/menuItemResaleFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-menu-items-resale-search',
  templateUrl: './menu-items-resale-search.component.html',
  styleUrls: ['./menu-items-resale-search.component.scss']
})
export class MenuItemsResaleSearchComponent implements OnInit {

  public filter: MenuItemResaleFilter = {
    name: '',
    nameDisabled: false
  }

  public menuItemsResale: Array<MenuItemResale> = [];
  public hasMenuItemsResaleAnswer: boolean = false;
  public menuItemsResaleError: any = null;
  public menuItemsResaleWaiting: boolean = false;

  constructor(private menuItemsResaleService: MenuItemsResaleService,
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

    this.hasMenuItemsResaleAnswer = false;
    setTimeout(() => {
      if (!this.hasMenuItemsResaleAnswer){
        this.menuItemsResaleWaiting = true; 
      }        
    }, 1000); 

    this.menuItemsResaleService.menuItemsResaleByName(name).subscribe({
      next: (res) => {
                        this.menuItemsResale = res;
                        this.menuItemsResaleWaiting = false;
                        this.hasMenuItemsResaleAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.menuItemsResaleError = error;
                          this.menuItemsResaleWaiting = false;
                          this.hasMenuItemsResaleAnswer = true;
                        },
    }); 

  }

}
