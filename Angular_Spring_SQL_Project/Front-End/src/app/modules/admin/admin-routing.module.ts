import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCategoryComponent } from './components/add-categoty/add-category.component';

const routes: Routes = [
  { path : "dashboard", component : DashboardComponent },
  { path : "category", component : AddCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
