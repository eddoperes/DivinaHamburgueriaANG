import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemDoCardapioComponent } from './item-do-cardapio/item-do-cardapio.component';
import { ItemDoEstoqueComponent } from './item-do-estoque/item-do-estoque.component';
import { FormsModule } from '@angular/forms';
import { ItemDoEstoqueEditComponent } from './item-do-estoque-edit/item-do-estoque-edit.component';

import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    ItemDoCardapioComponent,
    ItemDoEstoqueComponent,
    ItemDoEstoqueEditComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
