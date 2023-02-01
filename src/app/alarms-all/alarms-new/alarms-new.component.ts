//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { Alarm } from 'src/app/module/alarm';
import { AlarmsService } from 'src/app/services/alarms.service';

//form
import { AlarmsComponent } from '../alarms/alarms.component';

@Component({
  selector: 'app-alarm-new',
  templateUrl: './alarms-new.component.html',
  styleUrls: ['./alarms-new.component.scss']
})
export class AlarmsNewComponent implements OnInit {

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);

  constructor(private alarmsService: AlarmsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public setFormComponent(formComponent: AlarmsComponent){    
    var configure:any = {
      disableInputs: false,
    }
    formComponent.populateConfig(configure);
  }

  public sendData(id: number, alarm: Alarm | null):void{
    
    this.alarmsService
        .alarmNew(id, JSON.stringify(alarm))    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('alarms')},
          error: (error) => { 
                              if (error.status === 401){
                                this.router.navigateByUrl('login');
                              }
                              console.log(error) 
                            }
        });                  

  }

}
