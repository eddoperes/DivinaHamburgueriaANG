import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InventoryItemsComponent } from './inventory-items-all/inventory-items/inventory-items.component';
import { InventoryItemsEditComponent } from './inventory-items-all/inventory-items-edit/inventory-items-edit.component';
import { InventoryItemsNewComponent } from './inventory-items-all/inventory-items-new/inventory-items-new.component';
import { InventoryItemsRemoveComponent } from './inventory-items-all/inventory-items-remove/inventory-items-remove.component';
import { InventoryItemsSearchComponent } from './inventory-items-all/inventory-items-search/inventory-items-search.component';
import { PurchaseOrdersSearchComponent } from './purchase-orders-all/purchase-orders-search/purchase-orders-search.component';
import { PurchaseOrdersComponent } from './purchase-orders-all/purchase-orders/purchase-orders.component';
import { PurchaseOrdersNewComponent } from './purchase-orders-all/purchase-orders-new/purchase-orders-new.component';
import { PurchaseOrdersInventoryItemsComponent } from './purchase-orders-all/purchase-orders/purchase-orders-inventory-items/purchase-orders-inventory-items.component';
import { PurchaseOrdersEditComponent } from './purchase-orders-all/purchase-orders-edit/purchase-orders-edit.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory-all/inventory/inventory.component';
import { InventoryEditComponent } from './inventory-all/inventory-edit/inventory-edit.component';
import { InventorySearchComponent } from './inventory-all/inventory-search/inventory-search.component';
import { MessageboxComponent } from './messagebox/messagebox.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    InventoryItemsComponent,
    InventoryItemsEditComponent,
    InventoryItemsNewComponent,
    InventoryItemsRemoveComponent,
    InventoryItemsSearchComponent,
    PurchaseOrdersSearchComponent,
    PurchaseOrdersComponent,
    PurchaseOrdersNewComponent,
    PurchaseOrdersInventoryItemsComponent,
    PurchaseOrdersEditComponent,
    LoginComponent,
    InventoryComponent,
    InventoryEditComponent,
    InventorySearchComponent,
    MessageboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
