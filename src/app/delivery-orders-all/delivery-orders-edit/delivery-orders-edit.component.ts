import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryOrdersService } from 'src/app/services/delivery-orders.service';
import { DeliveryOrdersComponent } from '../delivery-orders/delivery-orders.component';

@Component({
  selector: 'app-delivery-order-edit',
  templateUrl: './delivery-orders-edit.component.html',
  styleUrls: ['./delivery-orders-edit.component.scss']
})
export class DeliveryOrdersEditComponent implements OnInit {

  constructor(private deliveryOrdersService: DeliveryOrdersService, 
              private route: ActivatedRoute,
              private router: Router) { }

  public deliveryOrderFetch: boolean = false;
  public deliveryOrderError: any = null;
  public deliveryOrderWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);
  public formComponent: DeliveryOrdersComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.deliveryOrderFetch && 
          this.deliveryOrderError === null){
        this.deliveryOrderWaiting = true;  
      }        
    }, 1000);    
    this.deliveryOrdersService.deliveryOrdersById(id!).subscribe({
      next: (res) => {
        this.deliveryOrderFetch = true;
        this.formComponent!.populateData(res);
        var configure : any = {
          disableInputs: false,
        }
        this.formComponent!.populateConfig(configure);
        this.deliveryOrderWaiting = false;
      },
      error: (error) => {
          if (error.status === 401){
            this.router.navigateByUrl('login');
          }
          this.deliveryOrderError = error;
          this.deliveryOrderWaiting = false;
        },
    });

  }

  public setFormComponent(formComponent: DeliveryOrdersComponent){    
    this.formComponent = formComponent;
  }

  public sendData(id: number, item: any):void{
  
    this.deliveryOrdersService
        .deliveryOrdersEdit(id, item)    
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
