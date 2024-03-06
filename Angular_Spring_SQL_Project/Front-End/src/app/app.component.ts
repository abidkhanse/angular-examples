import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LocaldbService } from './services/storage/localdb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  isAdminloggedIn : boolean = LocaldbService.isAdminLoggedIn()
  isCustomerloggedIn : boolean = LocaldbService.isCustomerLoggedIn()
  isSessionActive : boolean = LocaldbService.isSessionActive()
  
  constructor(
    private router: Router
  ) {}

  updateStatus() {

    this.isSessionActive = LocaldbService.isSessionActive()
    this.isCustomerloggedIn = LocaldbService.isCustomerLoggedIn()
    this.isAdminloggedIn = LocaldbService.isAdminLoggedIn()
  
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd") {
        this.updateStatus()
      }
    })
  }

  goToCategoty() {
      
  }

  logout() {
    LocaldbService.reset()
  }


}
