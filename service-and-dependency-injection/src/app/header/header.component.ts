import { Component } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [SubscribeService]
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

  constructor(private subscribeService: SubscribeService){}

  OnSubscribe() {
    this.subscribeService.OnSubscribe('new header component')
  }

}
