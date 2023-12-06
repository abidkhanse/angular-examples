import { Component } from '@angular/core';
import { SubscribeService } from '../../../services/subscribe.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  OnSubscribe() {
    let subscribeService = new SubscribeService()
    subscribeService.OnSubscribe('header component')

  }

}
