import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unidades } from '../module/unidades';
import { UnidadesService } from 'src/app/services/unidades.service';
import { Itensdoestoque } from '../module/itensdoestoque';
import { ItensdoestoqueService } from 'src/app/services/itensdoestoque.service';

@Component({
  selector: 'app-item-do-estoque-edit',
  templateUrl: './item-do-estoque-edit.component.html',
  styleUrls: ['./item-do-estoque-edit.component.scss']
})
export class ItemDoEstoqueEditComponent implements OnInit {

  constructor(private itensdoestoqueService: ItensdoestoqueService,
              private route: ActivatedRoute, 
              private router: Router,
              private unidadesService: UnidadesService){}

  public unidades: Array<Unidades> = [];
  public item: Itensdoestoque | undefined = undefined;
  
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

  public Enviar(id: number, form: any){
    
    if (!form.valid) {
      //console.log(form)      
      //form..reportValidity()
      return;
    }

    this.itensdoestoqueService
        .itensDoEstoqueEdit(id, form.value)    
        .subscribe({
          next: (res) => {this.router.navigateByUrl('itensdoestoque')},
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
