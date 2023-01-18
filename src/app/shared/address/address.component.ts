//angular
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { Address } from '../../module/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public addressForm: FormGroup = this.formBuilder.group({
    postalCode : "",
    street : "",  
    number : 0,
    complement : "", 
    district : "", 
    city : "", 
    federationUnity: "" 
  });

  @Input() setFormComponent : (formComponent: AddressComponent) => void = () => {};

  public postalCodeError : string = "";
  public streetError : string = "";  
  public numberError : string = ""; 
  public districtError : string = ""; 
  public cityError : string = ""; 
  public federationUnityError : string = ""; 

  public newOrEdit: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.setFormComponent(this);

  }

  public populateData(item: Address){
    this.addressForm = this.formBuilder.group({
      postalCode: [item.postalCode],
      street: [item.street],
      number: [item.number],
      complement: [item.complement],
      district: [item.district],
      city: [item.city],
      federationUnity: [item.federationUnity],
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.addressForm.controls['postalCode'].disable();
      this.addressForm.controls['street'].disable();          
      this.addressForm.controls['number'].disable();    
      this.addressForm.controls['complement'].disable();    
      this.addressForm.controls['district'].disable();    
      this.addressForm.controls['city'].disable();    
      this.addressForm.controls['federationUnity'].disable();    
      this.newOrEdit = false;
    }
  }

  public isDependecyReady() : boolean{
    //if (this.units.length === 0)
    //  return false;
    return true;
  }

}
