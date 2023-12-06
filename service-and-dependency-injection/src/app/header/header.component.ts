import { Component } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  selectedTab: string = 'home';

  //When HOME Link is clicked
  HomeClicked() {
    this.selectedTab = 'home';
  }

  //When Admin Link is clicked
  AdminClicked() {
    this.selectedTab = 'admin';
  }

  OnSubscribe() {
    //this.subService.OnSubscribeClicked('monthly');
    let subscribeService = new SubscribeService()
    subscribeService.OnSubscribe('header component')

  }

}
