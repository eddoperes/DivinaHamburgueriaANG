//angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { Provider } from 'src/app/module/provider';
import { ProvidersService } from 'src/app/services/providers.service';

//form
import { ProvidersComponent } from '../providers/providers.component';

@Component({
  selector: 'app-providers-edit',
  templateUrl: './providers-edit.component.html',
  styleUrls: ['./providers-edit.component.scss']
})
export class ProvidersEditComponent implements OnInit {

  constructor(private providersService: ProvidersService,
              private route: ActivatedRoute, 
              private router: Router) { }

  public providerFetch: boolean = false;
  public providerError: any = null;
  public providerWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);  
  public formComponent: ProvidersComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.providerFetch && 
          this.providerError === null){
        this.providerWaiting = true;  
      }        
    }, 1000);    
    this.providersService.providerById(id!).subscribe({
      next: (res) => {
        this.providerFetch = true;
        this.formComponent!.populateData(res);
        var configure : any = {
          disableInputs: false,
        }
        this.formComponent!.populateConfig(configure);
        this.providerWaiting = false;
      },
      error: (error) => {
          if (error.status === 401){
            this.router.navigateByUrl('login');
          }
          this.providerError = error;
          this.providerWaiting = false;
        },
    }); 

  }

  public setFormComponent(formComponent: ProvidersComponent){
    this.formComponent = formComponent;
  }
  
  public sendData(id: number, provider: Provider | null):void{
    
    this.providersService
        .providerEdit(id, JSON.stringify(provider))    
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

