//angular
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { Phone } from '../../module/phone';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  public phoneForm: FormGroup = this.formBuilder.group({
    ddd : "",
    number : 0
  });

  @Input() setFormComponent : (formComponent: PhoneComponent) => void = () => {};

  public dddError : string = "";
  public numberError : string = "";
  
  public newOrEdit: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.setFormComponent(this);

  }

  public populateData(item: Phone){
    this.phoneForm = this.formBuilder.group({
      ddd: [item.ddd],
      number: [item.number]
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.phoneForm.controls['ddd'].disable();         
      this.phoneForm.controls['number'].disable();       
      this.newOrEdit = false;
    }
  }

  public isDependecyReady() : boolean{
    //if (this.units.length === 0)
    //  return false;
    return true;
  }

}
