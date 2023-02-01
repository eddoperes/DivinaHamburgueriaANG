//angular
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { Alarm } from '../../module/alarm';
import { Unit } from '../../module/unit';
import { UnitsService } from 'src/app/services/units.service';
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit {

  public alarmForm: FormGroup = this.formBuilder.group({
    id: 0,
    eatableId: "",    
    minimumQuantity: 0,
    unityId: "",
    validityInDays: 0,  
  });

  @Input() sendData: (id: number, form: Alarm | null) => void = () => {};
  @Input() setFormComponent : (formComponent: AlarmsComponent) => void = () => {};

  public eatables: Array<Unit> = [];
  public eatablesError: any = null;
  public eatablesWaiting: boolean = false;

  public units: Array<Unit> = [];
  public unitsError: any = null;
  public unitsWaiting: boolean = false;
  
  public eatableError : string = "";
  public minimumQuantityError : string = "";
  public unitError : string = "";
  public validityInDaysError : string = "";

  public newOrEdit: boolean = true;

  constructor(private unitsService: UnitsService,
              private inventoryItemsService: InventoryItemsService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.setFormComponent(this);

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

    setTimeout(() => {
      if (this.units.length === 0 && 
          this.unitsError === null){
        this.unitsWaiting = true;  
      }        
    }, 1000); 
    this.unitsService.unidades().subscribe({      
      next : (res) => {
                        this.units = res; 
                        this.unitsWaiting = false;
                      },
      error : (error) => {
                          if (error.status === 401){
                            this.router.navigateByUrl('login');
                          }
                          this.unitsError = error;
                          this.unitsWaiting = false;
                         } 
    });

  }

  public populateData(item: Alarm){
    this.alarmForm = this.formBuilder.group({
      id: [item.id],
      eatableId: [item.eatableId],
      minimumQuantity: [item.minimumQuantity],
      unityId: [item.unityId],
      validityInDays: [item.validityInDays],
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.alarmForm.controls['eatableId'].disable();
      this.alarmForm.controls['minimumQuantity'].disable();
      this.alarmForm.controls['unityId'].disable();
      this.alarmForm.controls['validityInDays'].disable();
      this.newOrEdit = false;
    }
  }

  public isDependecyReady() : boolean{
    if (this.units.length === 0)
      return false;
    if (this.eatables.length === 0)
      return false;
    return true;
  }

  public handlePersistence(){  
    this.eatableError = "";
    this.minimumQuantityError = "";
    this.unitError = "";
    this.validityInDaysError = "";
    if (this.alarmForm.valid) {     
      this.sendData(this.alarmForm.controls['id'].value, 
                    this.alarmForm.value)
    }
    else {
      if (this.alarmForm.get('eatableId')?.errors?.['required'] !== undefined){
        this.eatableError = "* o comestível é requerido.";
      }
      if (this.alarmForm.get('minimumQuantity')?.errors?.['min'] !== undefined){
        this.minimumQuantityError = "* a quantidade mínima é 1.";
      }
      if (this.alarmForm.get('unityId')?.errors?.['required'] !== undefined){
        this.unitError = "* a unidade é requerida.";
      }
      if (this.alarmForm.get('validityInDays')?.errors?.['min'] !== undefined){
        this.validityInDaysError = "* a validade mínima é 1.";
      }
    }
  }  
  
}

