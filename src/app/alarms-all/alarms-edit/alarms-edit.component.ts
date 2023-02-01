//angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//data
import { Alarm } from 'src/app/module/alarm';
import { AlarmsService } from 'src/app/services/alarms.service';

//form
import { AlarmsComponent } from '../alarms/alarms.component';

@Component({
  selector: 'app-alarms-edit',
  templateUrl: './alarms-edit.component.html',
  styleUrls: ['./alarms-edit.component.scss']
})
export class AlarmsEditComponent implements OnInit {

  constructor(private alarmsService: AlarmsService,
              private route: ActivatedRoute, 
              private router: Router) { }

  public alarmFetch: boolean = false;
  public alarmError: any = null;
  public alarmWaiting: boolean = false;

  public sendDataFunctionPointer = this.sendData.bind(this);
  public setFormComponentFunctionPointer = this.setFormComponent.bind(this);  
  public formComponent: AlarmsComponent | undefined;

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    setTimeout(() => {
      if (!this.alarmFetch && 
          this.alarmError === null){
        this.alarmWaiting = true;  
      }        
    }, 1000);    
    this.alarmsService.alarmById(id!).subscribe({
      next: (res) => {
        this.alarmFetch = true;
        this.formComponent!.populateData(res);
        var configure : any = {
          disableInputs: false,
        }
        this.formComponent!.populateConfig(configure);
        this.alarmWaiting = false;
      },
      error: (error) => {
          if (error.status === 401){
            this.router.navigateByUrl('login');
          }
          this.alarmError = error;
          this.alarmWaiting = false;
        },
    }); 

  }

  public setFormComponent(formComponent: AlarmsComponent){
    this.formComponent = formComponent;
  }
  
  public sendData(id: number, alarm: Alarm | null):void{
    
    this.alarmsService
        .alarmEdit(id, JSON.stringify(alarm))    
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