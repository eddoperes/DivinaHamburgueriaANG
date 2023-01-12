//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { MenusService } from 'src/app/services/menus.service';

//form
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-menu-new',
  templateUrl: './menu-new.component.html',
  styleUrls: ['./menu-new.component.scss']
})
export class MenuNewComponent implements OnInit {

  constructor(private menusService: MenusService, 
              private router: Router) { }

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: MenuComponent){    
    var configure:any = {
      disableInputs: false,
    }
    formComponent.populateConfig(configure);
  }

  public sendData(id: number, item: any):void{

    this.menusService
        .menuNew(id, JSON.stringify(item))    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('menus')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}
