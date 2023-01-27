import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HallOrdersService } from 'src/app/services/hall-orders.service';
import { HallOrdersComponent } from '../hall-orders/hall-orders.component';

@Component({
  selector: 'app-hall-order-edit',
  templateUrl: './hall-orders-edit.component.html',
  styleUrls: ['./hall-orders-edit.component.scss']
})
export class HallOrdersEditComponent implements OnInit {

  constructor(private hallOrdersService: HallOrdersService, 
              private route: ActivatedRoute,
              private router: Router) { }

  public hallOrderFetch: boolean = false;
  public hallOrderError: any = null;
  public hallOrderWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);
  public formComponent: HallOrdersComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.hallOrderFetch && 
          this.hallOrderError === null){
        this.hallOrderWaiting = true;  
      }        
    }, 1000);    
    this.hallOrdersService.hallOrdersById(id!).subscribe({
      next: (res) => {
        this.hallOrderFetch = true;
        this.formComponent!.populateData(res);
        var configure : any = {
          disableInputs: false,
        }
        this.formComponent!.populateConfig(configure);
        this.hallOrderWaiting = false;
      },
      error: (error) => {
          if (error.status === 401){
            this.router.navigateByUrl('login');
          }
          this.hallOrderError = error;
          this.hallOrderWaiting = false;
        },
    });

  }

  public setFormComponent(formComponent: HallOrdersComponent){    
    this.formComponent = formComponent;
  }

  public sendData(id: number, item: any):void{
  
    this.hallOrdersService
        .hallOrdersEdit(id, item)    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('hallorders')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}
