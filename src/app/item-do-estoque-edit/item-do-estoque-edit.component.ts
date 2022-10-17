import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Itensdoestoque } from '../module/itensdoestoque';
import { UnidadesService } from 'src/app/services/unidades.service';
import { Unidades } from '../module/unidades';

import { ItensdoestoqueService } from 'src/app/services/itensdoestoque.service';

@Component({
  selector: 'app-item-do-estoque-edit',
  templateUrl: './item-do-estoque-edit.component.html',
  styleUrls: ['./item-do-estoque-edit.component.scss']
})
export class ItemDoEstoqueEditComponent implements OnInit {

  constructor(private itensdoestoqueService: ItensdoestoqueService,
              private route: ActivatedRoute, 
              private unidadesService: UnidadesService){}

  public item: Itensdoestoque | undefined = undefined;
  public unidades: Array<Unidades> = [];

  ngOnInit(): void {

    var id = this.route.snapshot.paramMap.get('id');

    this.itensdoestoqueService.itensDoEstoqueById(id!).subscribe({
      next: (res) => this.item = res,
      error: (error) => error
    }); 

    this.unidadesService.unidades().subscribe({
      next : (res) => this.unidades = res,
      error : (error) => error
    }); 

  }

  public Enviar(id: number, form: string){
    
    this.itensdoestoqueService
        .itensDoEstoqueEdit(id, form)    
        .subscribe({
          next: (res) => { /*console.log(res)*/ },
          error: (error) => { console.log(error) }
        });  
                
    //this.itensdoestoqueService
    //    .itensDoEstoqueNew(id, form)    
    //    .subscribe({
    //      next: (res) => { /*console.log(res)*/ },
    //      error: (error) => { console.log(error) }
    //    });

    //this.itensdoestoqueService
    //    .itensDoEstoqueDelete(id)    
    //    .subscribe({
    //      next: (res) => { /*console.log(res)*/ },
    //      error: (error) => { console.log(error) }
    //   });

  }

}
