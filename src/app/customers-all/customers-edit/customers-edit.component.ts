//angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { Customer } from 'src/app/module/customer';
import { CustomersService } from 'src/app/services/customers.service';

//form
import { CustomersComponent } from '../customers/customers.component';

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
  styleUrls: ['./customers-edit.component.scss']
})
export class CustomersEditComponent implements OnInit {

  constructor(private customersService: CustomersService,
              private route: ActivatedRoute, 
              private router: Router) { }

  public customerFetch: boolean = false;
  public customerError: any = null;
  public customerWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);  
  public formComponent: CustomersComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.customerFetch && 
          this.customerError === null){
        this.customerWaiting = true;  
      }        
    }, 1000);    
    this.customersService.customerById(id!).subscribe({
      next: (res) => {
        this.customerFetch = true;
        this.formComponent!.populateData(res);
        var configure : any = {
          disableInputs: false,
        }
        this.formComponent!.populateConfig(configure);
        this.customerWaiting = false;
      },
      error: (error) => {
          if (error.status === 401){
            this.router.navigateByUrl('login');
          }
          this.customerError = error;
          this.customerWaiting = false;
        },
    }); 

  }

  public setFormComponent(formComponent: CustomersComponent){
    this.formComponent = formComponent;
  }
  
  public sendData(id: number, customer: Customer | null):void{
    
    this.customersService
        .customerEdit(id, JSON.stringify(customer))    
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
