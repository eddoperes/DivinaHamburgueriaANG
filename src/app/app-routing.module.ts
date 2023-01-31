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

import { InventoryEditComponent } from './inventory-all/inventory-edit/inventory-edit.component';
import { InventorySearchComponent } from './inventory-all/inventory-search/inventory-search.component';

import { MenuItemsResaleNewComponent } from './menu-items-resale-all/menu-items-resale-new/menu-items-resale-new.component';
import { MenuItemsResaleEditComponent } from './menu-items-resale-all/menu-items-resale-edit/menu-items-resale-edit.component';
import { MenuItemsResaleRemoveComponent } from './menu-items-resale-all/menu-items-resale-remove/menu-items-resale-remove.component';
import { MenuItemsResaleSearchComponent } from './menu-items-resale-all/menu-items-resale-search/menu-items-resale-search.component';

import { MenuItemsRecipeNewComponent } from './menu-items-recipe-all/menu-items-recipe-new/menu-items-recipe-new.component';
import { MenuItemsRecipeEditComponent } from './menu-items-recipe-all/menu-items-recipe-edit/menu-items-recipe-edit.component';
import { MenuItemsRecipeRemoveComponent } from './menu-items-recipe-all/menu-items-recipe-remove/menu-items-recipe-remove.component';
import { MenuItemsRecipeSearchComponent } from './menu-items-recipe-all/menu-items-recipe-search/menu-items-recipe-search.component';

import { MenuNewComponent } from './menu-all/menu-new/menu-new.component';
import { MenuEditComponent } from './menu-all/menu-edit/menu-edit.component';
import { MenuRemoveComponent } from './menu-all/menu-remove/menu-remove.component';
import { MenuSearchComponent } from './menu-all/menu-search/menu-search.component';

import { CustomersNewComponent } from './customers-all/customers-new/customers-new.component';
import { CustomersEditComponent } from './customers-all/customers-edit/customers-edit.component';
import { CustomersRemoveComponent } from './customers-all/customers-remove/customers-remove.component';
import { CustomersSearchComponent } from './customers-all/customers-search/customers-search.component';

import { ProvidersNewComponent } from './providers-all/providers-new/providers-new.component';
import { ProvidersEditComponent } from './providers-all/providers-edit/providers-edit.component';
import { ProvidersRemoveComponent } from './providers-all/providers-remove/providers-remove.component';
import { ProvidersSearchComponent } from './providers-all/providers-search/providers-search.component';

import { UsersNewComponent } from './users-all/users-new/users-new.component';
import { UsersEditComponent } from './users-all/users-edit/users-edit.component';
import { UsersRemoveComponent } from './users-all/users-remove/users-remove.component';
import { UsersSearchComponent } from './users-all/users-search/users-search.component';

import { HallOrdersNewComponent } from './hall-orders-all/hall-orders-new/hall-orders-new.component';
import { HallOrdersEditComponent } from './hall-orders-all/hall-orders-edit/hall-orders-edit.component';
import { HallOrdersSearchComponent } from './hall-orders-all/hall-orders-search/hall-orders-search.component';

import { DeliveryOrdersNewComponent } from './delivery-orders-all/delivery-orders-new/delivery-orders-new.component';
import { DeliveryOrdersEditComponent } from './delivery-orders-all/delivery-orders-edit/delivery-orders-edit.component';
import { DeliveryOrdersSearchComponent } from './delivery-orders-all/delivery-orders-search/delivery-orders-search.component';

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
  
  { path: 'inventories', component: InventorySearchComponent },  
  { path: 'inventories/edit/:id', component: InventoryEditComponent },

  { path: 'menuitemsresale', component: MenuItemsResaleSearchComponent },
  { path: 'menuitemsresale/new', component: MenuItemsResaleNewComponent },
  { path: 'menuitemsresale/edit/:id', component: MenuItemsResaleEditComponent },
  { path: 'menuitemsresale/remove/:id', component: MenuItemsResaleRemoveComponent },

  { path: 'menuitemsrecipe', component: MenuItemsRecipeSearchComponent },
  { path: 'menuitemsrecipe/new', component: MenuItemsRecipeNewComponent },
  { path: 'menuitemsrecipe/edit/:id', component: MenuItemsRecipeEditComponent },
  { path: 'menuitemsrecipe/remove/:id', component: MenuItemsRecipeRemoveComponent },

  { path: 'menus', component: MenuSearchComponent },
  { path: 'menus/new', component: MenuNewComponent },
  { path: 'menus/edit/:id', component: MenuEditComponent },
  { path: 'menus/remove/:id', component: MenuRemoveComponent },

  { path: 'customers', component: CustomersSearchComponent },
  { path: 'customers/new', component: CustomersNewComponent },
  { path: 'customers/edit/:id', component: CustomersEditComponent },
  { path: 'customers/remove/:id', component: CustomersRemoveComponent },

  { path: 'providers', component: ProvidersSearchComponent },
  { path: 'providers/new', component: ProvidersNewComponent },
  { path: 'providers/edit/:id', component: ProvidersEditComponent },
  { path: 'providers/remove/:id', component: ProvidersRemoveComponent },

  { path: 'users', component: UsersSearchComponent },
  { path: 'users/new', component: UsersNewComponent },
  { path: 'users/edit/:id', component: UsersEditComponent },
  { path: 'users/remove/:id', component: UsersRemoveComponent },

  { path: 'hallorders', component: HallOrdersSearchComponent },
  { path: 'hallorders/new', component: HallOrdersNewComponent },
  { path: 'hallorders/edit/:id', component: HallOrdersEditComponent },

  { path: 'deliveryorders', component: DeliveryOrdersSearchComponent },
  { path: 'deliveryorders/new', component: DeliveryOrdersNewComponent },
  { path: 'deliveryorders/edit/:id', component: DeliveryOrdersEditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
