//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { Customer } from '../../module/customer';
import { CustomersService } from 'src/app/services/customers.service';

//search
import { CustomerFilter } from 'src/app/module/customerFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customers-search',
  templateUrl: './customers-search.component.html',
  styleUrls: ['./customers-search.component.scss']
})
export class CustomersSearchComponent implements OnInit {

  public filter: CustomerFilter = {
    name: '',
    nameDisabled: false
  }

  public customers: Array<Customer> = [];
  public hasCustomersAnswer: boolean = false;
  public customersError: any = null;
  public customersWaiting: boolean = false;

  constructor(private customersService: CustomersService,
              private localStorageService : LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {

    this.filter.name = this.localStorageService.get("name");
    this.filter.nameDisabled = this.localStorageService.get("nameDisabled");
   
    var name;
    if (this.filter.nameDisabled)
      name = "";
    else
      name = this.filter.name;

    this.executeSubmit(name);

  }

  public nameSpecificChange( event: any){
    this.filter.nameDisabled = false;
  }

  public nameAnyChange( event: any){
    this.filter.nameDisabled = true;
  }

  public handleSubmit(form: any){

    this.localStorageService.set("name", this.filter.name);
    this.localStorageService.set("nameDisabled", this.filter.nameDisabled);

    var name;
    if (this.filter.nameDisabled)
      name = "";
    else
      name = form.value.name;

    this.executeSubmit(name);
    
  }

  private executeSubmit(name: string){

    this.hasCustomersAnswer = false;
    setTimeout(() => {
      if (!this.hasCustomersAnswer){
        this.customersWaiting = true; 
      }        
    }, 1000); 

    this.customersService.customersByName(name).subscribe({
      next: (res) => {
                        this.customers = res;
                        this.customersWaiting = false;
                        this.hasCustomersAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.customersError = error;
                          this.customersWaiting = false;
                          this.hasCustomersAnswer = true;
                        },
    }); 

  }

}
