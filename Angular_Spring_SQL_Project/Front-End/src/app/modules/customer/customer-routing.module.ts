import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ViewProductsComponent} from "./components/view-products/view-products.component";
import {PostReservationComponent} from "./components/post-reservation/post-reservation.component";
import {ReservationDetailsComponent} from "./components/reservation-details/reservation-details.component";

const routes: Routes = [

  { path : "dashboard", component : DashboardComponent },
  { path : ":category-id/products",     component : ViewProductsComponent },
  { path : "reservation",     component : PostReservationComponent },
  { path : "reservations",     component : ReservationDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
