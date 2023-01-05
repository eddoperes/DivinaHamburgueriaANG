//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { MenuItemsResaleService } from 'src/app/services/menu-items-resale.service';

//form
import { MenuItemsResaleComponent } from '../menu-items-resale/menu-items-resale.component';

@Component({
  selector: 'app-menu-items-resale-edit',
  templateUrl: './menu-items-resale-edit.component.html',
  styleUrls: ['./menu-items-resale-edit.component.scss']
})
export class MenuItemsResaleEditComponent implements OnInit {

  constructor(private menuItemsResaleService: MenuItemsResaleService,
              private route: ActivatedRoute, 
              private router: Router) { }

  public menuItemResaleFetch: boolean = false;
  public menuItemResaleError: any = null;
  public menuItemResaleWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);  
  public formComponent: MenuItemsResaleComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.menuItemResaleFetch && 
          this.menuItemResaleError === null){
        this.menuItemResaleWaiting = true;  
      }        
    }, 1000);    
    this.menuItemsResaleService.menuItemResaleById(id!).subscribe({
      next: (res) => {
        this.menuItemResaleFetch = true;
        this.formComponent!.populateData(res);
        var configure : any = {
          disableInputs: false,
        }
        this.formComponent!.populateConfig(configure);
        this.menuItemResaleWaiting = false;
      },
      error: (error) => {
          if (error.status === 401){
            this.router.navigateByUrl('login');
          }
          this.menuItemResaleError = error;
          this.menuItemResaleWaiting = false;
        },
    }); 

  }

  public setFormComponent(formComponent: MenuItemsResaleComponent){
    this.formComponent = formComponent;
  }
  
  public sendData(id: number, form: FormGroup):void{
    
    this.menuItemsResaleService
        .menuItemResaleEdit(id, form.value)    
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
