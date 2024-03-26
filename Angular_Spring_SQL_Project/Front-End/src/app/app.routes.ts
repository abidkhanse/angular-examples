import { Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { AdminModule } from './modules/admin/admin.module';
import { CustomerModule } from './modules/customer/customer.module';

export const routes: Routes = [
    {path: "signup" , component : SignupComponent},
    {path: "signin" , component : SigninComponent},
    {path: '', redirectTo: 'signin', pathMatch: 'full' },
    {path: "admin" , loadChildren : () => import("./modules/admin/admin-routing.module").then(module => AdminModule) },
    {path: "customer" , loadChildren : () => import("./modules/customer/customer-routing.module").then(module => CustomerModule) },
];


