import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { ItensdoestoqueService } from 'src/app/services/itensdoestoque.service';

import { Itensdoestoque } from '../module/itensdoestoque';


@Component({
  selector: 'app-item-do-estoque',
  templateUrl: './item-do-estoque.component.html',
  styleUrls: ['./item-do-estoque.component.scss']
})
export class ItemDoEstoqueComponent implements OnInit {

  public itensdoestoque: Array<Itensdoestoque> = [];
   
  constructor(private itensdoestoqueService: ItensdoestoqueService) { }

  ngOnInit(): void {
    
    this.itensdoestoqueService.itensDoEstoque().subscribe({
      next: (res) => this.itensdoestoque = res,
      error: (error) => error
    }); 

  }

}
