//angular
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { InventoryItem } from '../../module/inventoryItem';
import { Unit } from '../../module/unit';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.scss']
})
export class InventoryItemsComponent implements OnInit {

  public inventoryItemForm: FormGroup = this.formBuilder.group({
    id: 0,
    name: "",
    brand: "",
    content: 0,
    unityId: "",
    type: 1,      
  });

  @Input() sendData: (id: number, form: FormGroup) => void = () => {};
  @Input() setFormComponent : (formComponent: InventoryItemsComponent) => void = () => {};

  public units: Array<Unit> = [];
  public unitsError: any = null;
  public unitsWaiting: boolean = false;

  public nameError : string = "";
  public contentError : string = "";
  public unitError : string = "";

  public newOrEdit: boolean = true;
  public accordionPanelStyle: string = '';

  constructor(private unitsService: UnitsService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.setFormComponent(this);

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
                          this.unitsError = error;
                          this.unitsWaiting = false;
                         } 
    });

  }

  public populateData(item: InventoryItem){
    this.inventoryItemForm = this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      brand: [item.brand],
      content: [item.content],
      unityId: [item.unityId],
      type: [item.type],
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.inventoryItemForm.controls['name'].disable();
      this.inventoryItemForm.controls['brand'].disable();
      this.inventoryItemForm.controls['content'].disable();
      this.inventoryItemForm.controls['unityId'].disable();
      this.inventoryItemForm.controls['type'].disable();
      this.newOrEdit = false;
    }
    this.accordionPanelStyle = 'display:block';
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
    if (this.units.length === 0)
      return false;
    return true;
  }

  public handlePersistence(){  
    this.nameError = "";
    this.contentError = "";
    this.unitError = "";
    if (this.inventoryItemForm.valid) {     
      this.sendData(this.inventoryItemForm.controls['id'].value, 
                    this.inventoryItemForm)
    }
    else {
      if (this.inventoryItemForm.get('name')?.errors?.['required'] !== undefined){
        this.nameError= "* o nome é requerido.";
      }
      if (this.inventoryItemForm.get('name')?.errors?.['minlength'] !== undefined){
        this.nameError= "* o nome precisa ter 3 letras ou mais.";
      }
      if (this.inventoryItemForm.get('content')?.errors?.['min'] !== undefined){
        this.contentError= "* o conteúdo mínimo é 1.";
      }
      if (this.inventoryItemForm.get('unityId')?.errors?.['required'] !== undefined){
        this.unitError= "* a unidade é requerida.";
      }
    }
  }  
  
}
