//angular
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//data
import { Eatable } from 'src/app/module/eatable';
import { Ingredient } from 'src/app/module/ingredient';
import { Unit } from 'src/app/module/unit';

@Component({
  selector: 'app-ingridients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

  public ingredientsForm: FormGroup = this.formBuilder.group({
    id : 0,
    eatableId : 1,    
    quantity: 0,
    unityId: 1     
  });
  
  @Input() eatables: Array<Eatable> = [];
  @Input() number: number = -1;
  @Input() units: Array<Unit> = [];

  public eatableError : string = "";
  public quantityError : string = "";
  public unitError : string = "";

  public deleted: boolean = false;

  public newOrEdit: boolean = true;
  public disableItemsButtons = false;

  public getSubForm (){
    if (this.deleted)
      return null;
    else
      return this.ingredientsForm;
  } 

  public hideComponent(event: any){
    this.deleted = true;
  }

  public isDependecyReady() : boolean{
    if (this.eatables.length === 0)
      return false;
    if (this.units.length === 0)
      return false;
    return true;
  }

  public populateData(item: Ingredient){
    this.ingredientsForm = this.formBuilder.group({
      id : [item.id],
      eatableId : [item.eatableId],
      quantity: [item.quantity],
      unityId: [item.unityId]     
    });
  }

  public populateConfig(configure: any){
    if (configure.disableInputs){
      this.ingredientsForm.controls['eatableId'].disable();
      this.ingredientsForm.controls['quantity'].disable();
      this.ingredientsForm.controls['unityId'].disable();
      this.newOrEdit = false;
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
