//angular
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

//data
import { HallOrder } from '../../module/hallOrder';
import { HallOrdersService } from 'src/app/services/hall-orders.service';

//search
import { HallOrderFilter } from 'src/app/module/hallOrderFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-hall-orders-search',
  templateUrl: './hall-orders-search.component.html',
  styleUrls: ['./hall-orders-search.component.scss']
})
export class HallOrdersSearchComponent implements OnInit {

  public filter: HallOrderFilter = {
    code: "",
    codeDisabled: false,
  }

  public hallorders: Array<HallOrder> = [];
  public hasHallOrdersAnswer: boolean = false;
  public hallOrdersError: any = null;
  public hallOrdersWaiting: boolean = false;

  private cancelMessageBox:any = null;
  public handleRegisterCancelFunctionPointer = this.handleRegisterCancel.bind(this);
  public handleCofirmedCancelFunctionPointer = this.handleConfirmedCancel.bind(this);

  private progressMessageBox:any = null;
  public handleRegisterProgressFunctionPointer = this.handleRegisterProgress.bind(this);
  public handleCofirmedProgressFunctionPointer = this.handleConfirmedProgress.bind(this);

  constructor(private hallOrdersService: HallOrdersService,
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
    else
      return "Servido"; 
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
      Served: 3,
  };

  public handleCancelClick(e: any, item: HallOrder){
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
      this.hallOrdersService
      .hallOrdersPatch(id, JSON.stringify(data))    
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

  public handleProgressClick(e: any, item: HallOrder){
    this.progressMessageBox.show(item.id, item.state, 0, e.pageX, e.pageY, "warning", "Confirma a progressão?");
  }

  public handleRegisterProgress(component: any){
    this.progressMessageBox = component;        
  }

  public handleConfirmedProgress(id:number, state:number, payment:number){
      var newState = state;
      if (state === this.stateEnum.Issued)
        newState = this.stateEnum.Served;
      var data = {
        id: id,
        state: newState
      }
      this.hallOrdersService
      .hallOrdersPatch(id, JSON.stringify(data))    
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

    this.hasHallOrdersAnswer = false;
    setTimeout(() => {
      if (!this.hasHallOrdersAnswer){
        this.hallOrdersWaiting = true; 
      }        
    }, 1000);

    this.hallOrdersService.hallOrdersByCode(code).subscribe({
      next: (res) => {
                        this.hallorders = res;
                        this.hallOrdersWaiting = false;
                        this.hasHallOrdersAnswer = true;
                     },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.hallOrdersError = error;
                          this.hallOrdersWaiting = false;
                          this.hasHallOrdersAnswer = true;
                        },
    }); 

  }

}
