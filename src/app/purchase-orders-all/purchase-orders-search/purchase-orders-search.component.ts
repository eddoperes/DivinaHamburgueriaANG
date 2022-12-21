//angular
import { Router } from '@angular/router';
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

  private paymentMessageBox:any = null;
  public handleRegisterPaymentFunctionPointer = this.handleRegisterPayment.bind(this);
  public handleCofirmedPaymentFunctionPointer = this.handleConfirmedPayment.bind(this);

  private cancelMessageBox:any = null;
  public handleRegisterCancelFunctionPointer = this.handleRegisterCancel.bind(this);
  public handleCofirmedCancelFunctionPointer = this.handleConfirmedCancel.bind(this);

  private progressMessageBox:any = null;
  public handleRegisterProgressFunctionPointer = this.handleRegisterProgress.bind(this);
  public handleCofirmedProgressFunctionPointer = this.handleConfirmedProgress.bind(this);

  public getProviderName(id: number): string{
    if (this.providers.length === 0)
      return ''
    return this.providers.filter(u => u.id === id)[0].name
  }

  constructor(private purchaseOrdersService: PurchaseOrdersService,
              private providersService: ProvidersService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

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
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
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

  private stateEnum = {
      Quotation: 1,
      Issued: 2,
      Canceled: 3,
      Arrived: 4,
      Stocked: 5
  };

  private paymentEnum = {
      Opened: 1,
      Paid: 2
  };

  public handlePaymentClick(e: any, item: PurchaseOrder){
    this.paymentMessageBox.show(item.id, item.state, item.payment, e.pageX, e.pageY, "info", "Confirma o pagamento?");
  }

  public handleRegisterPayment(component: any){
    this.paymentMessageBox = component;        
  }

  public handleConfirmedPayment(id:number, state:number, payment:number){
      var data = {
        id: id,
        state: state,
        payment: this.paymentEnum.Paid
      }
      this.purchaseOrdersService
      .purchaseOrdersPatch(id, JSON.stringify(data))    
      .subscribe({
        next: (res) => {console.log(res)},
        error: (error) => { 
                            if (error.status === 401){
                              this.router.navigateByUrl('login');
                            }
                            console.log(error) 
                          }
      });                  
  }

  public handleCancelClick(e: any, item: PurchaseOrder){
    this.cancelMessageBox.show(item.id, item.state, item.payment, e.pageX, e.pageY, "danger", "Confirma o cancelamento?");
  }

  public handleRegisterCancel(component: any){
    this.cancelMessageBox = component;        
  }

  public handleConfirmedCancel(id:number, state:number, payment:number){
      var data = {
        id: id,
        state: this.stateEnum.Canceled,
        payment: payment
      }
      this.purchaseOrdersService
      .purchaseOrdersPatch(id, JSON.stringify(data))    
      .subscribe({
        next: (res) => {console.log(res)},
        error: (error) => { 
                            if (error.status === 401){
                              this.router.navigateByUrl('login');
                            }
                            console.log(error) 
                          }
      });                  
  }

  public handleProgressClick(e: any, item: PurchaseOrder){
    this.progressMessageBox.show(item.id, item.state, item.payment, e.pageX, e.pageY, "warning", "Confirma a progressão?");
  }

  public handleRegisterProgress(component: any){
    this.progressMessageBox = component;        
  }

  public handleConfirmedProgress(id:number, state:number, payment:number){
      var newState = state;
      if (state === this.stateEnum.Quotation)
        newState = this.stateEnum.Issued;
      else if (state === this.stateEnum.Issued)
        newState = this.stateEnum.Arrived;
      var data = {
        id: id,
        state: newState,
        payment: payment
      }
      this.purchaseOrdersService
      .purchaseOrdersPatch(id, JSON.stringify(data))    
      .subscribe({
        next: (res) => {console.log(res)},
        error: (error) => { 
                            if (error.status === 401){
                              this.router.navigateByUrl('login');
                            }
                            console.log(error) 
                          }
      });                  
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
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.purchaseOrdersError = error;
                          this.purchaseOrdersWaiting = false;
                          this.hasPurchaseOrdersAnswer = true;
                        },
    }); 

  }

}
