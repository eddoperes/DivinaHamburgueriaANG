//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryOrder } from 'src/app/module/deliveryOrder';

//data
import { DeliveryOrdersService } from 'src/app/services/delivery-orders.service';

//form
import { DeliveryOrdersComponent } from '../delivery-orders/delivery-orders.component';

@Component({
  selector: 'app-delivery-orders-new',
  templateUrl: './delivery-orders-new.component.html',
  styleUrls: ['./delivery-orders-new.component.scss']
})
export class DeliveryOrdersNewComponent implements OnInit {

  constructor(private deliveryOrdersService: DeliveryOrdersService, 
              private router: Router) { }

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: DeliveryOrdersComponent){    
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

  public sendData(id: number, item: DeliveryOrder):void{
  
    item.userId = this.getUser();

    //console.log(item)

    this.deliveryOrdersService
        .deliveryOrdersNew(id, JSON.stringify(item))    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('deliveryorders')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}
