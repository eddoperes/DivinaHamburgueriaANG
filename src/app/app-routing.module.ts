import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDoEstoqueEditComponent } from './item-do-estoque-edit/item-do-estoque-edit.component';
import { ItemDoEstoqueComponent } from './item-do-estoque/item-do-estoque.component';

const routes: Routes = [  
  { path: 'itensdoestoque', component: ItemDoEstoqueComponent },
  { path: 'itensdoestoque/edit/:id', component: ItemDoEstoqueEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
