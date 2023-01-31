//angular
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

//data
import { DeliveryOrder } from '../../module/deliveryOrder';
import { DeliveryOrdersService } from 'src/app/services/delivery-orders.service';

//search
import { DeliveryOrderFilter } from 'src/app/module/deliveryOrderFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-delivery-orders-search',
  templateUrl: './delivery-orders-search.component.html',
  styleUrls: ['./delivery-orders-search.component.scss']
})
export class DeliveryOrdersSearchComponent implements OnInit {

  public filter: DeliveryOrderFilter = {
    code: "",
    codeDisabled: false,
  }

  public deliveryorders: Array<DeliveryOrder> = [];
  public hasDeliveryOrdersAnswer: boolean = false;
  public deliveryOrdersError: any = null;
  public deliveryOrdersWaiting: boolean = false;

  private paymentMessageBox:any = null;
  public handleRegisterPaymentFunctionPointer = this.handleRegisterPayment.bind(this);
  public handleCofirmedPaymentFunctionPointer = this.handleConfirmedPayment.bind(this);

  private cancelMessageBox:any = null;
  public handleRegisterCancelFunctionPointer = this.handleRegisterCancel.bind(this);
  public handleCofirmedCancelFunctionPointer = this.handleConfirmedCancel.bind(this);

  private progressMessageBox:any = null;
  public handleRegisterProgressFunctionPointer = this.handleRegisterProgress.bind(this);
  public handleCofirmedProgressFunctionPointer = this.handleConfirmedProgress.bind(this);

  constructor(private deliveryOrdersService: DeliveryOrdersService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {

    this.filter.code = this.localStorageService.get("providerId");
    this.filter.codeDisabled = this.localStorageService.get("providerDisabled");
    
    var code;
    if (this.filter.codeDisabled)
      code = "";
    else
      code = this.filter.code;

    this.executeSubmit(code);    

  }

  public getStateDescription(number: number){
    if (number === 1)
      return "Emitido";
    else if (number === 2)
      return "Cancelado";
    else if (number === 3)
      return "Empacotado"; 
    else
      return "Entregue"; 
  }

  public getPaymentDescription(number: number){
    if (number === 1)
      return "Aberto";
    else 
      return "Pago";
  }

  public providerSpecificChange(event: any){
    this.filter.codeDisabled = false;
  }

  public providerAnyChange(event: any){
    this.filter.codeDisabled = true;
  }

  private stateEnum = {
      Issued: 1,
      Canceled: 2,
      Packaged: 3,
      Delivered: 4,
  };

  private paymentEnum = {
    Opened: 1,
    Paid: 2
  };

  public handlePaymentClick(e: any, item: DeliveryOrder){
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
      this.deliveryOrdersService
      .deliveryOrdersPatch(id, JSON.stringify(data))    
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



  public handleCancelClick(e: any, item: DeliveryOrder){
    this.cancelMessageBox.show(item.id, item.state, 0, e.pageX, e.pageY, "danger", "Confirma o cancelamento?");
  }

  public handleRegisterCancel(component: any){
    this.cancelMessageBox = component;        
  }

  public handleConfirmedCancel(id:number, state:number, payment:number){
      var data = {
        id: id,
        state: this.stateEnum.Canceled
      }
      this.deliveryOrdersService
      .deliveryOrdersPatch(id, JSON.stringify(data))    
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

  public handleProgressClick(e: any, item: DeliveryOrder){
    this.progressMessageBox.show(item.id, item.state, 0, e.pageX, e.pageY, "warning", "Confirma a progressão?");
  }

  public handleRegisterProgress(component: any){
    this.progressMessageBox = component;        
  }

  public handleConfirmedProgress(id:number, state:number, payment:number){
      var newState = state;
      if (state === this.stateEnum.Issued)
        newState = this.stateEnum.Packaged;
      else if (state === this.stateEnum.Packaged)
        newState = this.stateEnum.Delivered;
      var data = {
        id: id,
        state: newState
      }
      this.deliveryOrdersService
      .deliveryOrdersPatch(id, JSON.stringify(data))    
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

    this.localStorageService.set("codeId", this.filter.code);
    this.localStorageService.set("codeDisabled", this.filter.codeDisabled);
    
    var code;
    if (this.filter.codeDisabled)
      code = "";
    else
      code = form.value.code;

    this.executeSubmit(code);
     
  }

  private executeSubmit(code: string){    

    this.hasDeliveryOrdersAnswer = false;
    setTimeout(() => {
      if (!this.hasDeliveryOrdersAnswer){
        this.deliveryOrdersWaiting = true; 
      }        
    }, 1000);

    this.deliveryOrdersService.deliveryOrdersByCode(code).subscribe({
      next: (res) => {
                        this.deliveryorders = res;
                        this.deliveryOrdersWaiting = false;
                        this.hasDeliveryOrdersAnswer = true;
                     },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.deliveryOrdersError = error;
                          this.deliveryOrdersWaiting = false;
                          this.hasDeliveryOrdersAnswer = true;
                        },
    }); 

  }

}
