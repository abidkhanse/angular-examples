import { Component } from '@angular/core';
import { SubscribeService } from '../../../services/subscribe.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  OnSubscribe() {
    let subscribeService = new SubscribeService()
    subscribeService.OnSubscribe('sidebar component')


  }

}
