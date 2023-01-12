//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { Menu } from '../../module/menu';
import { MenusService } from 'src/app/services/menus.service';

//search
import { MenuFilter } from 'src/app/module/menuFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss']
})
export class MenuSearchComponent implements OnInit {

  public filter: MenuFilter = {
    name: '',
    nameDisabled: false
  }

  public menus: Array<Menu> = [];
  public hasMenusAnswer: boolean = false;
  public menusError: any = null;
  public menusWaiting: boolean = false;

  constructor(private menusService: MenusService,
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

    this.hasMenusAnswer = false;
    setTimeout(() => {
      if (!this.hasMenusAnswer){
        this.menusWaiting = true; 
      }        
    }, 1000); 

    this.menusService.menuByName(name).subscribe({
      next: (res) => {
                        this.menus = res;
                        this.menusWaiting = false;
                        this.hasMenusAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.menusError = error;
                          this.menusWaiting = false;
                          this.hasMenusAnswer = true;
                        },
    }); 

  }

}
