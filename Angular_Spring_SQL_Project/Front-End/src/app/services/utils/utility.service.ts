import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  static getTableTypes(): string[] {
    return [
      "Standard Table",
      "Booth Table",
      "Counter Table",
      "Round Table",
      "Outdoor Table",
      "High-top Table",
      "Folding Table",
      "Picnic Table",
      "Conference Table",
      "Pub Table"
    ];
  }



}
