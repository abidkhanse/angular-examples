import { Component } from '@angular/core';
import { SubscribeService } from '../../../services/subscribe.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [SubscribeService]
})
export class SidebarComponent {

  constructor(private subscribeService: SubscribeService) {}

  OnSubscribe() {
    this.subscribeService.OnSubscribe('new sidebar component')
  }

}
