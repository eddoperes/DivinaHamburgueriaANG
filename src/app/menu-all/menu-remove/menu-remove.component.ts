//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { MenusService } from 'src/app/services/menus.service';

//form
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-menu-remove',
  templateUrl: './menu-remove.component.html',
  styleUrls: ['./menu-remove.component.scss']
})
export class MenuRemoveComponent implements OnInit {

  constructor(private menusService: MenusService,
              private route: ActivatedRoute, 
              private router: Router) { }

  public menuFetch: boolean = false;
  public menuError: any = null;
  public menuWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);  
  public formComponent: MenuComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.menuFetch && 
          this.menuError === null){
            this.menuWaiting = true;  
      }        
    }, 1000);    
    this.menusService.menuById(id!).subscribe({
      next: (res) => {
                        this.menuFetch = true;
                        this.formComponent!.populateData(res);
                        var configure : any = {
                          disableInputs: true,
                        } 
                        this.formComponent!.populateConfig(configure);
                        this.menuWaiting = false;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.menuError = error;
                          this.menuWaiting = false;
                        },
    }); 

  }

  public setFormComponent(formComponent: MenuComponent){
    this.formComponent = formComponent;
  }

  public sendData(id: number, form: FormGroup):void{

    this.menusService
        .menuDelete(id)    
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
