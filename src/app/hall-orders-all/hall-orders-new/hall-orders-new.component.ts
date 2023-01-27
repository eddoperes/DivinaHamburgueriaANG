//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HallOrder } from 'src/app/module/hallOrder';

//data
import { HallOrdersService } from 'src/app/services/hall-orders.service';

//form
import { HallOrdersComponent } from '../hall-orders/hall-orders.component';

@Component({
  selector: 'app-hall-orders-new',
  templateUrl: './hall-orders-new.component.html',
  styleUrls: ['./hall-orders-new.component.scss']
})
export class HallOrdersNewComponent implements OnInit {

  constructor(private hallOrdersService: HallOrdersService, 
              private router: Router) { }

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: HallOrdersComponent){    
    var configure:any = {
      disableInputs: false,
    }
    formComponent.populateConfig(configure);
  }

  private getUser(): number {
    var storage = window.localStorage;
    if (storage) {
        var value = storage.getItem("token");
        if (value === null)
          return 0;
        else
          return JSON.parse(value).userId;
    }
    return 0;
  }

  public sendData(id: number, item: HallOrder):void{
  
    item.userId = this.getUser();

    //console.log(item)

    this.hallOrdersService
        .hallOrdersNew(id, JSON.stringify(item))    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('hallorders')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}
