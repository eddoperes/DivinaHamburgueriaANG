import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() open: boolean = false;
  @Input() title: string = "title";

  public panelShow: string = "";
  public upShow: string = "";
  public downShow: string = "";

  public AccordionClick(e : any): void {
    e.preventDefault();
    /*
    e.target.classList.toggle("active");
    var panel = e.target?.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
    */

    var target = e.target; 
    for(var i=0; i<3; i++){
      var up = target.children[1];
      var down = target.children[0];
      if (up === undefined) {target = target.parentNode;} else {break};      
    }

    target.classList.toggle("accordion-active");
    var panel = target.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      up.style.display = "none";
      down.style.display = "block";
    } else {
      panel.style.display = "block";
      up.style.display = "block";
      down.style.display = "none";
    }

  }

  constructor() { }

  ngOnInit(): void {
    if (this.open){
      this.panelShow = "display:block;";
      this.upShow = "display:block;";
      this.downShow = "display:none;";
    }
  }

}
