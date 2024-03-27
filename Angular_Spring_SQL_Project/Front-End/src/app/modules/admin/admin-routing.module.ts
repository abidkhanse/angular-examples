import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCategoryComponent } from './components/add-categoty/add-category.component';
import {AllCategoriesComponent} from "./components/all-categories/all-categories.component";
import {AddProductInfoComponent} from "./components/add-product-info/add-product-info.component";
import {ViewProductsComponent} from "./components/view-products/view-products.component";
import {UpdateProductComponent} from "./components/update-product/update-product.component";
import {GetReservationsComponent} from "./components/get-reservations/get-reservations.component";

const routes: Routes = [

  { path : "dashboard",                 component : DashboardComponent },
  { path : "category",                  component : AddCategoryComponent },
  { path : "categories",                component : AllCategoriesComponent },
  { path : ":category-id/product-info", component : AddProductInfoComponent },
  { path : ":category-id/products",     component : ViewProductsComponent },
  { path : "product/:product-id",       component : UpdateProductComponent },
  { path : "reservations",              component : GetReservationsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
