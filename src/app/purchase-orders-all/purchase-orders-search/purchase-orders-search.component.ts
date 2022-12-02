//angular
import { Component, OnInit } from '@angular/core';

//data
import { Provider } from '../../module/provider';
import { ProvidersService } from 'src/app/services/providers.service';
import { PurchaseOrder } from '../../module/purchaseOrder';
import { PurchaseOrdersService } from 'src/app/services/purchase-orders.service';

//search
import { PurchaseOrderFilter } from 'src/app/module/purchaseOrderFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-purchase-orders-search',
  templateUrl: './purchase-orders-search.component.html',
  styleUrls: ['./purchase-orders-search.component.scss']
})
export class PurchaseOrdersSearchComponent implements OnInit {

  public filter: PurchaseOrderFilter = {
    providerId: 1,
    providerDisabled: false,
  }

  public purchaseorders: Array<PurchaseOrder> = [];
  public hasPurchaseOrdersAnswer: boolean = false;
  public purchaseOrdersError: any = null;
  public purchaseOrdersWaiting: boolean = false;

  public providers: Array<Provider> = [];  
  public providersError: any = null;
  public providersWaiting: boolean = false;

  public getProviderName(id: number): string{
    if (this.providers.length === 0)
      return ''
    return this.providers.filter(u => u.id === id)[0].name
  }

  constructor(private purchaseOrdersService: PurchaseOrdersService,
              private providersService: ProvidersService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    setTimeout(() => {
      if (this.providers.length === 0 && 
          this.providersError === null){
        this.providersWaiting = true;  
      }        
    }, 1000); 
    this.providersService.providers().subscribe({      
      next : (res) => {
                        this.providers = res; 
                        this.providersWaiting = false;
                      },
      error : (error) => {
                          this.providersError = error;
                          this.providersWaiting = false;
                         } 
    }); 

    this.filter.providerId = this.localStorageService.get("providerId");
    this.filter.providerDisabled = this.localStorageService.get("providerDisabled");
    
    var providerId;
    if (this.filter.providerDisabled)
      providerId = 0;
    else
      providerId = this.filter.providerId;

    this.executeSubmit(providerId);

  }

  public getStateDescription(number: number){
    if (number === 1)
      return "Cotação";
    else if (number === 2)
      return "Emitido";
    else if (number === 3)
      return "Cancelado";
    else if (number === 4)
      return "Entregue"; 
    else 
      return "Estocado"; 
  }

  public getPaymentDescription(number: number){
    if (number === 1)
      return "Aberto";
    else 
      return "Pago";
  }

  public providerSpecificChange(event: any){
    this.filter.providerDisabled = false;
  }

  public providerAnyChange(event: any){
    this.filter.providerDisabled = true;
  }

  public handleSubmit(form: any){

    this.localStorageService.set("providerId", this.filter.providerId);
    this.localStorageService.set("providerDisabled", this.filter.providerDisabled);
    
    var providerId;
    if (this.filter.providerDisabled)
      providerId = 0;
    else
      providerId = form.value.provider;

    this.executeSubmit(providerId);
     
  }

  private executeSubmit(providerId: number){

    this.hasPurchaseOrdersAnswer = false;
    setTimeout(() => {
      if (!this.hasPurchaseOrdersAnswer){
        this.purchaseOrdersWaiting = true; 
      }        
    }, 1000);

    this.purchaseOrdersService.purchaseOrdersByProvider (providerId).subscribe({
      next: (res) => {
                        this.purchaseorders = res;
                        this.purchaseOrdersWaiting = false;
                        this.hasPurchaseOrdersAnswer = true;
                     },
      error: (error) => {
                          this.purchaseOrdersError = error;
                          this.purchaseOrdersWaiting = false;
                          this.hasPurchaseOrdersAnswer = true;
                        },
    }); 

  }

}
