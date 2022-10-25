import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDoEstoqueEditComponent } from './item-do-estoque-edit/item-do-estoque-edit.component';
import { ItemDoEstoqueComponent } from './item-do-estoque/item-do-estoque.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: 'itensdoestoque', component: ItemDoEstoqueComponent },
  { path: 'itensdoestoque/edit/:id', component: ItemDoEstoqueEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
