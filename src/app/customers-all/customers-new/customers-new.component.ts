//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

//data
import { Customer } from 'src/app/module/customer';
import { CustomersService } from 'src/app/services/customers.service';

//form
import { CustomersComponent } from '../customers/customers.component';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customers-new.component.html',
  styleUrls: ['./customers-new.component.scss']
})
export class CustomersNewComponent implements OnInit {

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  constructor(private customersService: CustomersService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: CustomersComponent){    
    var configure:any = {
      disableInputs: false,
    }
    formComponent.populateConfig(configure);
  }

  public sendData(id: number, customer: Customer | null):void{
    
    this.customersService
        .customerNew(id, JSON.stringify(customer))    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('customers')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}
