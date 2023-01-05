//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

//data
import { MenuItemsResaleService } from 'src/app/services/menu-items-resale.service';

//form
import { MenuItemsResaleComponent } from '../menu-items-resale/menu-items-resale.component';

@Component({
  selector: 'app-menu-items-resale-new',
  templateUrl: './menu-items-resale-new.component.html',
  styleUrls: ['./menu-items-resale-new.component.scss']
})
export class MenuItemsResaleNewComponent implements OnInit {

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  constructor(private menuItemsResaleService: MenuItemsResaleService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: MenuItemsResaleComponent){    
    var configure:any = {
      disableInputs: false,
    }
    formComponent.populateConfig(configure);
  }

  public sendData(id: number, form: FormGroup):void{
    
    this.menuItemsResaleService
        .menuItemResaleNew(id, form.value)    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('menuitemsresale')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}
