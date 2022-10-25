import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { UnidadesService } from 'src/app/services/unidades.service';
import { Unidades } from '../module/unidades';

import { ItensdoestoqueService } from 'src/app/services/itensdoestoque.service';

import { Itensdoestoque } from '../module/itensdoestoque';

@Component({
  selector: 'app-item-do-estoque',
  templateUrl: './item-do-estoque.component.html',
  styleUrls: ['./item-do-estoque.component.scss']
})
export class ItemDoEstoqueComponent implements OnInit {

  public itensdoestoque: Array<Itensdoestoque> = [];
  public unidades: Array<Unidades> = [];

  public getUnityName(id: number): string{
    if (this.unidades.length === 0)
      return ''
    return this.unidades.filter(u => u.id === id)[0].name
  }

  public getTypeName(id: number): string{
    if (id === 1)
      return "Receita"
    else if (id === 2)
      return "Revenda"
    else
      return ''    
  }
   
  constructor(private itensdoestoqueService: ItensdoestoqueService,
              private unidadesService: UnidadesService) { }

  ngOnInit(): void {
    
    this.unidadesService.unidades().subscribe({
      next : (res) => this.unidades = res,
      error : (error) => error
    }); 

    this.itensdoestoqueService.itensDoEstoque().subscribe({
      next: (res) => this.itensdoestoque = res,
      error: (error) => error
    }); 

  }

}
