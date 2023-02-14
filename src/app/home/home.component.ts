//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data
import { QuantityAlarmTriggered } from '../module/quantityAlarmTriggered';
import { QuantityAlarmsTriggeredService } from 'src/app/services/quantity-alarms-triggered.service';

import { ValidityAlarmTriggered } from '../module/validityAlarmTriggered';
import { ValidityAlarmsTriggeredService } from 'src/app/services/validity-alarms-triggered.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public quantityAlarmsTriggered: Array<QuantityAlarmTriggered> = [];
  public hasQuantityAlarmsTriggeredAnswer: boolean = false;
  public quantityAlarmsTriggeredError: any = null;
  public quantityAlarmsTriggeredWaiting: boolean = false;

  public validityAlarmsTriggered: Array<ValidityAlarmTriggered> = [];
  public hasValidityAlarmsTriggeredAnswer: boolean = false;
  public validityAlarmsTriggeredError: any = null;
  public validityAlarmsTriggeredWaiting: boolean = false;

  constructor(private quantityAlarmsTriggeredService: QuantityAlarmsTriggeredService,
              private validityAlarmsTriggeredService: ValidityAlarmsTriggeredService,
              private router: Router) { }

  ngOnInit(): void {
    this.executeSubmit();
  }

  private executeSubmit(){

    this.hasQuantityAlarmsTriggeredAnswer = false;
    setTimeout(() => {
      if (!this.hasQuantityAlarmsTriggeredAnswer){
        this.quantityAlarmsTriggeredWaiting = true; 
      }        
    }, 1000); 

    this.quantityAlarmsTriggeredService.quantityAlarmsTriggered().subscribe({
      next: (res) => {
                        this.quantityAlarmsTriggered = res;
                        this.quantityAlarmsTriggeredWaiting = false;
                        this.hasQuantityAlarmsTriggeredAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.quantityAlarmsTriggeredError = error;
                          this.quantityAlarmsTriggeredWaiting = false;
                          this.hasQuantityAlarmsTriggeredAnswer = true;
                        },
    }); 

    this.hasValidityAlarmsTriggeredAnswer = false;
    setTimeout(() => {
      if (!this.hasValidityAlarmsTriggeredAnswer){
        this.validityAlarmsTriggeredWaiting = true; 
      }        
    }, 1000); 

    this.validityAlarmsTriggeredService.validityAlarmsTriggered().subscribe({
      next: (res) => {
                        this.validityAlarmsTriggered = res;
                        this.validityAlarmsTriggeredWaiting = false;
                        this.hasValidityAlarmsTriggeredAnswer = true;
                      },
      error: (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.validityAlarmsTriggeredError = error;
                          this.validityAlarmsTriggeredWaiting = false;
                          this.hasValidityAlarmsTriggeredAnswer = true;
                        },
    });


  }

}
