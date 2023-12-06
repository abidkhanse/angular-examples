import { Component } from '@angular/core';
import { SubscribeService } from '../../../services/subscribe.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  providers: [SubscribeService]
})

export class HeroComponent {

  constructor(private subService: SubscribeService) { }

  OnSubscribe() {
    this.subService.OnSubscribe('new hero component')
  }

}
