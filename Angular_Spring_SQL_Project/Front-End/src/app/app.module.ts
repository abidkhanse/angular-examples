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
import { ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(en);


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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,


  ],
  providers: [UserService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
