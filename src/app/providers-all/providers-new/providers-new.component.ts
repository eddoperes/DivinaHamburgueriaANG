//angular
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

//data
import { Provider } from 'src/app/module/provider';
import { ProvidersService } from 'src/app/services/providers.service';

//form
import { ProvidersComponent } from '../providers/providers.component';

@Component({
  selector: 'app-provider-new',
  templateUrl: './providers-new.component.html',
  styleUrls: ['./providers-new.component.scss']
})
export class ProvidersNewComponent implements OnInit {

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  constructor(private providersService: ProvidersService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: ProvidersComponent){    
    var configure:any = {
      disableInputs: false,
    }
    formComponent.populateConfig(configure);
  }

  public sendData(id: number, provider: Provider | null):void{
    
    this.providersService
        .providerNew(id, JSON.stringify(provider))    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('providers')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}