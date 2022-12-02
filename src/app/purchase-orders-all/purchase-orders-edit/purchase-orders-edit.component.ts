import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrdersService } from 'src/app/services/purchase-orders.service';
import { PurchaseOrdersComponent } from '../purchase-orders/purchase-orders.component';

@Component({
  selector: 'app-purchase-order-edit',
  templateUrl: './purchase-orders-edit.component.html',
  styleUrls: ['./purchase-orders-edit.component.scss']
})
export class PurchaseOrdersEditComponent implements OnInit {

  constructor(private purchaseOrdersService: PurchaseOrdersService, 
              private route: ActivatedRoute,
              private router: Router) { }

  public purchaseOrderFetch: boolean = false;
  public purchaseOrderError: any = null;
  public purchaseOrderWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);
  public formComponent: PurchaseOrdersComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.purchaseOrderFetch && 
          this.purchaseOrderError === null){
        this.purchaseOrderWaiting = true;  
      }        
    }, 1000);    
    this.purchaseOrdersService.purchaseOrdersById(id!).subscribe({
      next: (res) => {
        this.purchaseOrderFetch = true;
        this.formComponent!.populateData(res);
        var configure : any = {
          disableInputs: true,
        }
        this.formComponent!.populateConfig(configure);
        this.purchaseOrderWaiting = false;
      },
      error: (error) => {
          this.purchaseOrderError = error;
          this.purchaseOrderWaiting = false;
        },
    });

  }

  public setFormComponent(formComponent: PurchaseOrdersComponent){    
    this.formComponent = formComponent;
  }

  public sendData(id: number, item: any):void{
  
    this.purchaseOrdersService
        .purchaseOrdersPatch(id, item)    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('purchaseorders')},
          error: (error) => { console.log(error) }
        });                  

  }

}
