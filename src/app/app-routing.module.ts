import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { InventoryItemsNewComponent } from './inventory-items-all/inventory-items-new/inventory-items-new.component';
import { InventoryItemsEditComponent } from './inventory-items-all/inventory-items-edit/inventory-items-edit.component';
import { InventoryItemsRemoveComponent } from './inventory-items-all/inventory-items-remove/inventory-items-remove.component';
import { InventoryItemsSearchComponent } from './inventory-items-all/inventory-items-search/inventory-items-search.component';

import { PurchaseOrdersNewComponent } from './purchase-orders-all/purchase-orders-new/purchase-orders-new.component';
import { PurchaseOrdersEditComponent } from './purchase-orders-all/purchase-orders-edit/purchase-orders-edit.component';
import { PurchaseOrdersSearchComponent } from './purchase-orders-all/purchase-orders-search/purchase-orders-search.component';

const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inventoryitems', component: InventoryItemsSearchComponent },
  { path: 'inventoryitems/new', component: InventoryItemsNewComponent },
  { path: 'inventoryitems/edit/:id', component: InventoryItemsEditComponent },
  { path: 'inventoryitems/remove/:id', component: InventoryItemsRemoveComponent },
  { path: 'purchaseorders', component: PurchaseOrdersSearchComponent },
  { path: 'purchaseorders/new', component: PurchaseOrdersNewComponent },
  { path: 'purchaseorders/edit/:id', component: PurchaseOrdersEditComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
