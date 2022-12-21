//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { PurchaseOrdersService } from 'src/app/services/purchase-orders.service';

//form
import { PurchaseOrdersComponent } from '../purchase-orders/purchase-orders.component';

@Component({
  selector: 'app-purchase-orders-new',
  templateUrl: './purchase-orders-new.component.html',
  styleUrls: ['./purchase-orders-new.component.scss']
})
export class PurchaseOrdersNewComponent implements OnInit {

  constructor(private purchaseOrdersService: PurchaseOrdersService, 
              private router: Router) { }

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: PurchaseOrdersComponent){    
    var configure:any = {
      disableInputs: false,
    }
    formComponent.populateConfig(configure);
  }

  public sendData(id: number, item: any):void{
  
    this.purchaseOrdersService
        .purchaseOrdersNew(id, item)    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('purchaseorders')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}
