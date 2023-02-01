//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { Alarm } from '../../module/alarm';
import { AlarmsService } from 'src/app/services/alarms.service';

//search
import { AlarmFilter } from 'src/app/module/alarmFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Eatable } from 'src/app/module/eatable';
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';

@Component({
  selector: 'app-alarms-search',
  templateUrl: './alarms-search.component.html',
  styleUrls: ['./alarms-search.component.scss']
})
export class AlarmsSearchComponent implements OnInit {

  public filter: AlarmFilter = {
    eatable: 0,
    eatableDisabled: false
  }

  public alarms: Array<Alarm> = [];
  public hasAlarmsAnswer: boolean = false;
  public alarmsError: any = null;
  public alarmsWaiting: boolean = false;

  public eatables: Array<Eatable> = [];  
  public eatablesError: any = null;
  public eatablesWaiting: boolean = false;

  constructor(private alarmsService: AlarmsService,
              private inventoryItemsService: InventoryItemsService,
              private localStorageService : LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      if (this.eatables.length === 0 && 
          this.eatables === null){
        this.eatablesWaiting = true;  
      }        
    }, 1000); 
    this.inventoryItemsService.distinctNames().subscribe({      
      next : (res) => {
                        this.eatables = res; 
                        this.eatablesWaiting = false;
                      },
      error : (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.eatablesError = error;
                          this.eatablesWaiting = false;
                         } 
    }); 

    if (this.localStorageService.get("eatableIdDisabled") === ""){
      this.filter.eatableDisabled = true;
      return; 
    }

    this.filter.eatable = this.localStorageService.get("eatableId");
    this.filter.eatableDisabled = this.localStorageService.get("eatableIdDisabled");
   
    var eatableId;
    if (this.filter.eatableDisabled)
      eatableId = 0;
    else
      eatableId = this.filter.eatable;

    this.executeSubmit(eatableId);

  }

  public eatableSpecificChange( event: any){
    this.filter.eatableDisabled = false;
  }

  public eatableAnyChange( event: any){
    this.filter.eatableDisabled = true;
  }

  public getEatableName(id: number): string{
    if (this.eatables.length === 0)
      return ''
    return this.eatables.filter(u => u.id === id)[0].name
  }

  public handleSubmit(form: any){

    this.localStorageService.set("eatableId", this.filter.eatable);
    this.localStorageService.set("eatableIdDisabled", this.filter.eatableDisabled);

    var eatableId;
    if (this.filter.eatableDisabled)
      eatableId = 0;
    else
      eatableId = form.value.eatable;

    this.executeSubmit(eatableId);
    
  }

  private executeSubmit(eatableId: number){

    this.hasAlarmsAnswer = false;
    setTimeout(() => {
      if (!this.hasAlarmsAnswer){
        this.alarmsWaiting = true; 
      }        
    }, 1000); 

    this.alarmsService.alarmsByEatable(eatableId).subscribe({
      next: (res) => {
                        this.alarms = res;
                        this.alarmsWaiting = false;
                        this.hasAlarmsAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.alarmsError = error;
                          this.alarmsWaiting = false;
                          this.hasAlarmsAnswer = true;
                        },
    }); 

  }

}

