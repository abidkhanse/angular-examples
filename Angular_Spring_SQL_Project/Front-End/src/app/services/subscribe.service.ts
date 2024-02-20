import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor() { }

  OnSubscribe(value: string) {
    //this.subService.OnSubscribeClicked('monthly');
    alert('welcome to ' + value + ' button')
  }

}
