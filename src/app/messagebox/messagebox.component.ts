import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss']
})
export class MessageboxComponent implements OnInit {

  @Input() handleRegister: (component: any) => void = () => {};
  @Input() handleConfirmed: (id:number, state:number, payment:number) => void = () => {};

  private pageY: number = 0;
  private pageX: number = 0;
  private typeColor: string = "black";

  public visible: boolean = false;
  public message: string = '';
  public messageBoxStyle: string = '';

  private id: number = 0;
  private state: number = 0;
  private payment: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.handleRegister(this);    
  }

  public show(id: number, state: number, payment: number, pageX: number, pageY: number, typeName: string, message: string){
    
    if (typeName === 'danger')
      this.typeColor = '#ffeeee';
    else if (typeName === 'info')
      this.typeColor = '#eeffff';
    else if (typeName === 'warning')
      this.typeColor ='#ffffee';

    if (pageX > (window.parent.innerWidth * 0.75))
      pageX = pageX * 0.75;
    this.pageX = pageX;
    this.pageY = pageY;

    this.messageBoxStyle=`top: ${this.pageY}px; left: ${this.pageX}px; background-color: ${this.typeColor}`;

    this.id = id;
    this.state =  state;
    this.payment = payment;
    this.message = message;
    this.visible = true;    
    
  }

  public handleYes(e: any){    
    this.handleConfirmed(this.id, this.state, this.payment);
    this.visible = false;
  }

  public handleNo(e: any){
    this.visible = false;
  }

}
