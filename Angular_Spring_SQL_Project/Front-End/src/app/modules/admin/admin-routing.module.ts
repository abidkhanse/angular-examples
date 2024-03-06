import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCategotyComponent } from './components/add-categoty/add-categoty.component';

const routes: Routes = [
  { path : "dashboard", component : DashboardComponent },
  { path : "category", component : AddCategotyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
