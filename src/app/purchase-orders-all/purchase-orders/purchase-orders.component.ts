//angular
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

//data
import { PurchaseOrder } from '../../module/purchaseOrder';
import { InventoryItem } from '../../module/inventoryItem';
import { InventoryItemsService } from 'src/app/services/inventoryitems.service';
import { Provider } from '../../module/provider';
import { ProvidersService } from 'src/app/services/providers.service';

//form
import { PurchaseOrdersInventoryItemsComponent } from './purchase-orders-inventory-items/purchase-orders-inventory-items.component';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {

  public purchaseOrderForm: FormGroup = this.formBuilder.group({
    id : 0,
    providerId : 0,
    state: 1,
    observation: "",
    payment: 1,
    total: 0, 
  });

  @ViewChild("inventoryItemsContainer", { read: ViewContainerRef }) inventoryItemsContainer: any;

  @Input() sendData: (id: number, form: any) => void = () => {};
  @Input() setFormComponent : (formComponent: PurchaseOrdersComponent) => void = () => {};

  public providers: Array<Provider> = [];
  public providersError: any = null;
  public providersWaiting: boolean = false;

  public inventoryItems: Array<InventoryItem> = [];
  public inventoryItemsError: any = null;
  public inventoryItemsWaiting: boolean = false;

  public totalError : string = "";
  
  public inventoryItemsInstances: Array<any> = [];
  public newOrEdit: boolean = true;
  public accordionPanelStyle: string = '';
  public disableItemsButtons = false;

  constructor(private providersService: ProvidersService,
              private inventoryItemsService: InventoryItemsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.setFormComponent(this);

    setTimeout(() => {
      if (this.providers.length === 0 && 
          this.providersError === null){
        this.providersWaiting = true;  
      }        
    }, 1000); 
    this.providersService.providers().subscribe({      
      next : (res) => {
                        this.providers = res; 
                        this.providersWaiting = false;
                      },
      error : (error) => {
                          this.providersError = error;
                          this.providersWaiting = false;
                         } 
    }); 

    setTimeout(() => {
      if (this.inventoryItems.length === 0 && 
          this.inventoryItemsError === null){
        this.inventoryItemsWaiting = true;  
      }        
    }, 1000); 
    this.inventoryItemsService.itensDoEstoque().subscribe({      
      next : (res) => {
                        this.inventoryItems = res; 
                        this.inventoryItemsWaiting = false;
                      },
      error : (error) => {
                          this.inventoryItemsError = error;
                          this.inventoryItemsWaiting = false;
                         } 
    }); 

  }

  public populateData(item: PurchaseOrder){
    this.purchaseOrderForm = this.formBuilder.group({
      id: [item.id],
      providerId : [item.providerId],
      state: [item.state],
      observation: [item.observation],
      payment: [item.payment],
      total: [item.total], 
    });
    setTimeout(() => {
      for(var i=0; i < item.purchaseOrderInventoryItems.length; i++){
          var component = this.inventoryItemsContainer.createComponent(PurchaseOrdersInventoryItemsComponent);
          component.instance.inventoryItems= this.inventoryItems;
          component.instance.number = this.inventoryItemsInstances.length;
          component.instance.populateData(item.purchaseOrderInventoryItems[i]);
          this.inventoryItemsInstances.push(component.instance);
      }     
    }, 100);
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.purchaseOrderForm.controls['providerId'].disable();
      this.purchaseOrderForm.controls['observation'].disable();
      this.purchaseOrderForm.controls['total'].disable();
      this.newOrEdit = false;
      setTimeout(() => {
        for(var i=0; i < this.inventoryItemsInstances.length; i++){
          this.inventoryItemsInstances[i].getSubForm().controls['inventoryItemId'].disable();
          this.inventoryItemsInstances[i].getSubForm().controls['unitPrice'].disable();
          this.inventoryItemsInstances[i].getSubForm().controls['quantity'].disable();
          this.inventoryItemsInstances[i].getSubForm().controls['totalPrice'].disable();
        }     
      }, 100);
    }   
    this.disableItemsButtons = configure.disableInputs;
    setTimeout(() => {
      for(var i=0; i < this.inventoryItemsInstances.length; i++){
        this.inventoryItemsInstances[i].disableItemsButtons = configure.disableInputs;     
      }    
    }, 100);
    this.accordionPanelStyle = 'display:block';
  }

  public AccordionClick(e : any): void {
    e.preventDefault();
    e.target.classList.toggle("active");
    var panel = e.target?.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }

  public newItem (e : any): void  {
    e.preventDefault();    
    var component = this.inventoryItemsContainer.createComponent(PurchaseOrdersInventoryItemsComponent);
    component.instance.inventoryItems= this.inventoryItems;
    component.instance.number = this.inventoryItemsInstances.length;
    this.inventoryItemsInstances.push(component.instance);    
  }

  public isDependecyReady() : boolean{
    if (this.providers.length === 0)
      return false;
    return true;
  }

  public handlePersistence(){ 
    
    var isValid : boolean = true;

    if (this.purchaseOrderForm.valid) {    
      this.totalError= "";
    } else {
      if (this.purchaseOrderForm.get('total')?.errors?.['min'] !== undefined){
        this.totalError= "* o total mínimo é 1.";
      }  
      isValid = false;
    }

    for(var i=0; i < this.inventoryItemsInstances.length; i++){ 
      var subForm = this.inventoryItemsInstances[i].getSubForm();    
      if (subForm.valid){
        this.inventoryItemsInstances[i].unitPriceError = "";
        this.inventoryItemsInstances[i].quantityError = "";
        this.inventoryItemsInstances[i].totalPriceError = "";
      } else {
        if (subForm.get('unitPrice')?.errors?.['min'] !== undefined){
          this.inventoryItemsInstances[i].unitPriceError = "* o preço unitário mínimo é 1.";
        }  
        if (subForm.get('quantity')?.errors?.['min'] !== undefined){
          this.inventoryItemsInstances[i].quantityError = "* a quantidade mínima é 1.";
        }  
        if (subForm.get('totalPrice')?.errors?.['min'] !== undefined){
          this.inventoryItemsInstances[i].totalPriceError = "* a preço total mínimo é 1.";
        }  
        isValid = false;
      }        
    }
    
    if (!isValid){
      return;
    }

    var purchaseOrder : PurchaseOrder = this.purchaseOrderForm.value;
    purchaseOrder.purchaseOrderInventoryItems = [];    
    for(var i=0; i < this.inventoryItemsInstances.length; i++){
      var subForm = this.inventoryItemsInstances[i].getSubForm(); 
      purchaseOrder.purchaseOrderInventoryItems.push(subForm.value);
    }    

    this.sendData(this.purchaseOrderForm.controls['id'].value, 
                  purchaseOrder);

  }  

}
