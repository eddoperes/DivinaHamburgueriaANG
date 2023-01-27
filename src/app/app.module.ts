import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
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
import { MenuItemsResaleComponent } from './menu-items-resale-all/menu-items-resale/menu-items-resale.component';
import { MenuItemsResaleSearchComponent } from './menu-items-resale-all/menu-items-resale-search/menu-items-resale-search.component';
import { MenuItemsResaleEditComponent } from './menu-items-resale-all/menu-items-resale-edit/menu-items-resale-edit.component';
import { MenuItemsResaleNewComponent } from './menu-items-resale-all/menu-items-resale-new/menu-items-resale-new.component';
import { MenuItemsResaleRemoveComponent } from './menu-items-resale-all/menu-items-resale-remove/menu-items-resale-remove.component';
import { MenuItemsRecipeSearchComponent } from './menu-items-recipe-all/menu-items-recipe-search/menu-items-recipe-search.component';
import { MenuItemsRecipeEditComponent } from './menu-items-recipe-all/menu-items-recipe-edit/menu-items-recipe-edit.component';
import { MenuItemsRecipeNewComponent } from './menu-items-recipe-all/menu-items-recipe-new/menu-items-recipe-new.component';
import { MenuItemsRecipeRemoveComponent } from './menu-items-recipe-all/menu-items-recipe-remove/menu-items-recipe-remove.component';
import { MenuItemsRecipeComponent } from './menu-items-recipe-all/menu-items-recipe/menu-items-recipe.component';
import { IngredientsComponent } from './menu-items-recipe-all/menu-items-recipe/ingredients/ingredients.component';
import { MenuSearchComponent } from './menu-all/menu-search/menu-search.component';
import { MenuComponent } from './menu-all/menu/menu.component';
import { MenuMenuItemComponent } from './menu-all/menu/menu-menu-item/menu-menu-item.component';
import { MenuEditComponent } from './menu-all/menu-edit/menu-edit.component';
import { MenuNewComponent } from './menu-all/menu-new/menu-new.component';
import { MenuRemoveComponent } from './menu-all/menu-remove/menu-remove.component';
import { CustomersSearchComponent } from './customers-all/customers-search/customers-search.component';
import { CustomersEditComponent } from './customers-all/customers-edit/customers-edit.component';
import { CustomersComponent } from './customers-all/customers/customers.component';
import { AddressComponent } from './shared/address/address.component';
import { PhoneComponent } from './shared/phone/phone.component';
import { CustomersRemoveComponent } from './customers-all/customers-remove/customers-remove.component';
import { CustomersNewComponent } from './customers-all/customers-new/customers-new.component';
import { ProvidersComponent } from './providers-all/providers/providers.component';
import { ProvidersEditComponent } from './providers-all/providers-edit/providers-edit.component';
import { ProvidersNewComponent } from './providers-all/providers-new/providers-new.component';
import { ProvidersRemoveComponent } from './providers-all/providers-remove/providers-remove.component';
import { ProvidersSearchComponent } from './providers-all/providers-search/providers-search.component';
import { UsersComponent } from './users-all/users/users.component';
import { UsersSearchComponent } from './users-all/users-search/users-search.component';
import { UsersEditComponent } from './users-all/users-edit/users-edit.component';
import { UsersNewComponent } from './users-all/users-new/users-new.component';
import { UsersRemoveComponent } from './users-all/users-remove/users-remove.component';
import { HallOrdersSearchComponent } from './hall-orders-all/hall-orders-search/hall-orders-search.component';
import { HallOrdersNewComponent } from './hall-orders-all/hall-orders-new/hall-orders-new.component';
import { HallOrdersComponent } from './hall-orders-all/hall-orders/hall-orders.component';
import { HallOrdersEditComponent } from './hall-orders-all/hall-orders-edit/hall-orders-edit.component';
import { HallOrdersMenuItemsComponent } from './hall-orders-all/hall-orders/hall-orders-menu-items/hall-orders-menu-items.component';

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
    MessageboxComponent,
    MenuItemsResaleComponent,
    MenuItemsResaleSearchComponent,
    MenuItemsResaleEditComponent,
    MenuItemsResaleNewComponent,
    MenuItemsResaleRemoveComponent,
    MenuItemsRecipeSearchComponent,
    MenuItemsRecipeEditComponent,
    MenuItemsRecipeNewComponent,
    MenuItemsRecipeRemoveComponent,
    MenuItemsRecipeComponent,
    IngredientsComponent,
    MenuSearchComponent,
    MenuComponent,
    MenuMenuItemComponent,
    MenuEditComponent,
    MenuNewComponent,
    MenuRemoveComponent,
    CustomersSearchComponent,
    CustomersEditComponent,
    CustomersComponent,
    AddressComponent,
    PhoneComponent,
    CustomersRemoveComponent,
    CustomersNewComponent,
    ProvidersComponent,
    ProvidersEditComponent,
    ProvidersNewComponent,
    ProvidersRemoveComponent,
    ProvidersSearchComponent,
    UsersComponent,
    UsersSearchComponent,
    UsersEditComponent,
    UsersNewComponent,
    UsersRemoveComponent,
    HallOrdersSearchComponent,
    HallOrdersNewComponent,
    HallOrdersComponent,
    HallOrdersEditComponent,
    HallOrdersMenuItemsComponent,
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
