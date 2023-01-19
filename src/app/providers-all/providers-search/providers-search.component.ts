//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { Provider } from '../../module/provider';
import { ProvidersService } from 'src/app/services/providers.service';

//search
import { ProviderFilter } from 'src/app/module/providerFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-providers-search',
  templateUrl: './providers-search.component.html',
  styleUrls: ['./providers-search.component.scss']
})
export class ProvidersSearchComponent implements OnInit {

  public filter: ProviderFilter = {
    name: '',
    nameDisabled: false
  }

  public providers: Array<Provider> = [];
  public hasProvidersAnswer: boolean = false;
  public providersError: any = null;
  public providersWaiting: boolean = false;

  constructor(private providersService: ProvidersService,
              private localStorageService : LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {

    if(this.localStorageService.get("nameProviderDisabled") === ""){
      this.filter.nameDisabled = true;
      return;
    }

    this.filter.name = this.localStorageService.get("nameProvider");
    this.filter.nameDisabled = this.localStorageService.get("nameProviderDisabled");
   
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

    this.localStorageService.set("nameProvider", this.filter.name);
    this.localStorageService.set("nameProviderDisabled", this.filter.nameDisabled);

    var name;
    if (this.filter.nameDisabled)
      name = "";
    else
      name = form.value.name;

    this.executeSubmit(name);
    
  }

  private executeSubmit(name: string){

    this.hasProvidersAnswer = false;
    setTimeout(() => {
      if (!this.hasProvidersAnswer){
        this.providersWaiting = true; 
      }        
    }, 1000); 

    this.providersService.providersByName(name).subscribe({
      next: (res) => {
                        this.providers = res;
                        this.providersWaiting = false;
                        this.hasProvidersAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.providersError = error;
                          this.providersWaiting = false;
                          this.hasProvidersAnswer = true;
                        },
    }); 

  }

}
