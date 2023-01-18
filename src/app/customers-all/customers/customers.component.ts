//angular
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { Customer } from '../../module/customer';

//form
import { AddressComponent } from 'src/app/shared/address/address.component';
import { PhoneComponent } from 'src/app/shared/phone/phone.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customerForm: FormGroup = this.formBuilder.group({
    id: 0,
    name: "",
    cpf: ""    
  });

  @Input() sendData: (id: number, customer: Customer | null) => void = () => {};
  @Input() setFormComponent : (formComponent: CustomersComponent) => void = () => {};

  public nameError : string = "";
  public cpfError : string = "";  

  public newOrEdit: boolean = true;
  public accordionAddressPanelStyle: string = '';
  public accordionPhonePanelStyle: string = '';

  constructor(private formBuilder: FormBuilder) { }

  public setAddressFormComponentFunctionPointer = this.setAddressFormComponent.bind(this);  
  public addressFormComponent: AddressComponent | undefined;

  public setPhoneFormComponentFunctionPointer = this.setPhoneFormComponent.bind(this);  
  public phoneFormComponent: PhoneComponent | undefined;

  ngOnInit(): void {
    this.setFormComponent(this);
  }

  public setAddressFormComponent(formComponent: AddressComponent){    
    this.addressFormComponent = formComponent;
  }

  public setPhoneFormComponent(formComponent: PhoneComponent){    
    this.phoneFormComponent = formComponent;
  }

  public populateData(item: Customer){
    this.customerForm = this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      cpf: [item.cpf]
    });
    if (item.address !== null)
      this.addressFormComponent?.populateData(item.address)
    if (item.phone !== null)  
      this.phoneFormComponent?.populateData(item.phone)
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.customerForm.controls['name'].disable();
      this.customerForm.controls['cpf'].disable();     
      this.newOrEdit = false;
    }
    this.addressFormComponent?.populateConfig(configure)
    this.phoneFormComponent?.populateConfig(configure)
    this.accordionAddressPanelStyle = 'display:block';
    this.accordionPhonePanelStyle = 'display:block';
  }

  public accordionClick(e : any): void {
    e.preventDefault();
    e.target.classList.toggle("accordion-active");
    var panel = e.target?.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }

  public isDependecyReady() : boolean{
    //if (this.units.length === 0)
    //  return false;
    return true;
  }

  public handlePersistence(){  

    if (!this.newOrEdit){
      this.sendData(this.customerForm.controls['id'].value, 
                    null);
      return;
    }

    var isValid: boolean = true;

    this.nameError = "";
    this.cpfError = "";

    if (!this.customerForm.valid) {     
      if (this.customerForm.get('name')?.errors?.['required'] !== undefined){
        this.nameError= "* o nome é requerido.";
      }
      if (this.customerForm.get('cpf')?.errors?.['minlength'] !== undefined){
        this.cpfError= "* o cpf precisa ter 11 digitos.";
      }     
      isValid = false;
    }

    this.addressFormComponent!.postalCodeError = "";
    this.addressFormComponent!.streetError = "";
    this.addressFormComponent!.numberError = "";
    this.addressFormComponent!.districtError = "";
    this.addressFormComponent!.cityError = "";
    this.addressFormComponent!.federationUnityError = "";

    if (!this.addressFormComponent!.addressForm.valid) {   
      if (this.addressFormComponent!.addressForm.get('postalCode')?.errors?.['required'] !== undefined){
        this.addressFormComponent!.postalCodeError = "* o CEP é requerido.";
      }
      if (this.addressFormComponent!.addressForm.get('postalCode')?.errors?.['minLenght'] !== undefined){
        this.addressFormComponent!.postalCodeError = "* o CEP deve ter oito digitos.";
      }   
      if (this.addressFormComponent!.addressForm.get('street')?.errors?.['required'] !== undefined){
        this.addressFormComponent!.streetError = "* a rua é requerida.";
      } 
      if (this.addressFormComponent!.addressForm.get('number')?.errors?.['required'] !== undefined){
        this.addressFormComponent!.numberError = "* o número é requerido.";
      }  
      if (this.addressFormComponent!.addressForm.get('number')?.errors?.['min'] !== undefined){
        this.addressFormComponent!.numberError = "* a número deve ser maior que zero.";
      }  
      if (this.addressFormComponent!.addressForm.get('district')?.errors?.['required'] !== undefined){
        this.addressFormComponent!.districtError = "* o bairro é requerido.";
      }  
      if (this.addressFormComponent!.addressForm.get('city')?.errors?.['required'] !== undefined){
        this.addressFormComponent!.cityError = "* a cidade é requerida.";
      } 
      if (this.addressFormComponent!.addressForm.get('federationUnity')?.errors?.['required'] !== undefined){
        this.addressFormComponent!.federationUnityError = "* a UF é requerida.";
      } 
      isValid = false;
    }

    this.phoneFormComponent!.dddError = "";
    this.phoneFormComponent!.numberError = "";

    if (!this.phoneFormComponent!.phoneForm.valid) {   
      if (this.phoneFormComponent!.phoneForm.get('ddd')?.errors?.['required'] !== undefined){
        this.phoneFormComponent!.dddError = "* o ddd é requerido.";
      }
      if (this.phoneFormComponent!.phoneForm.get('number')?.errors?.['required'] !== undefined){
        this.phoneFormComponent!.numberError = "* o número é requerido.";
      }
      if (this.phoneFormComponent!.phoneForm.get('number')?.errors?.['minLenght'] !== undefined){
        this.phoneFormComponent!.numberError = "* o número deve ter oito ou nove dígitos.";
      }
      if (this.phoneFormComponent!.phoneForm.get('number')?.errors?.['maxLenght'] !== undefined){
        this.phoneFormComponent!.numberError = "* o número deve ter oito ou nove dígitos.";
      }
      isValid = false;
    }

    if (!isValid){      
      return;
    }

    var customer : Customer = this.customerForm.value;
    customer.address = this.addressFormComponent!.addressForm.value;
    customer.phone = this.phoneFormComponent!.phoneForm.value;

    this.sendData(this.customerForm.controls['id'].value, 
                  customer)

  }  

}
