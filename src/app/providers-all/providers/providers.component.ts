//angular
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { Provider } from '../../module/provider';

//form
import { AddressComponent } from 'src/app/shared/address/address.component';
import { PhoneComponent } from 'src/app/shared/phone/phone.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  public providerForm: FormGroup = this.formBuilder.group({
    id: 0,
    name: "",
    cnpj: ""    
  });

  @Input() sendData: (id: number, provider: Provider | null) => void = () => {};
  @Input() setFormComponent : (formComponent: ProvidersComponent) => void = () => {};

  public nameError : string = "";
  public cnpjError : string = "";  

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

  public populateData(item: Provider){
    this.providerForm = this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      cnpj: [item.cnpj]
    });
    if (item.address !== null)
      this.addressFormComponent?.populateData(item.address)
    if (item.phone !== null)  
      this.phoneFormComponent?.populateData(item.phone)
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.providerForm.controls['name'].disable();
      this.providerForm.controls['cnpj'].disable();     
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
      this.sendData(this.providerForm.controls['id'].value, 
                    null);
      return;
    }

    var isValid: boolean = true;

    this.nameError = "";
    this.cnpjError = "";

    if (!this.providerForm.valid) {     
      if (this.providerForm.get('name')?.errors?.['required'] !== undefined){
        this.nameError= "* o nome é requerido.";
      }
      if (this.providerForm.get('cnpj')?.errors?.['minlength'] !== undefined){
        this.cnpjError= "* o cnpj precisa ter 11 digitos.";
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

    var provider : Provider = this.providerForm.value;
    provider.address = this.addressFormComponent!.addressForm.value;
    provider.phone = this.phoneFormComponent!.phoneForm.value;

    this.sendData(this.providerForm.controls['id'].value, 
                  provider)

  }  

}