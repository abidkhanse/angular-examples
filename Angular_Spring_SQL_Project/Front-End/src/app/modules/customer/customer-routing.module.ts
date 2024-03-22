import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ViewProductsComponent} from "./components/view-products/view-products.component";

const routes: Routes = [

  { path : "dashboard", component : DashboardComponent },
  { path : ":category-id/products",     component : ViewProductsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
