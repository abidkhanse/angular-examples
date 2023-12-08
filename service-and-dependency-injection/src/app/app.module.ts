import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './header/admin/admin.component';
import { HomeComponent } from './header/home/home.component';
import { HeroComponent } from './header/home/hero/hero.component';
import { SidebarComponent } from './header/home/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './header/admin/user-list/user-list.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    HomeComponent,
    HeroComponent,
    SidebarComponent,
    UserListComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
