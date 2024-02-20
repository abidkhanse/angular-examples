import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [SubscribeService]
})

export class HeaderComponent implements OnInit {

  myForm: FormGroup;

  constructor(private subscribeService: SubscribeService ,private formBuilder: FormBuilder) {}



  startDate: string;
  endDate: string;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  enabledMonths: string[] = [];
  monthValues: { [key: string]: string } = {};
  isDateRangeSelected: boolean = false;


  getinfo() {
    this.enabledMonths.forEach(month => {
      console.log(`${month} value:`, this.myForm.get(month).value);
    });
  }
  updateEnabledMonths() {
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);

    this.enabledMonths = [];

    for (let currentMonth = startDateObj.getMonth(); currentMonth <= endDateObj.getMonth(); currentMonth++) {
      this.enabledMonths.push(this.months[currentMonth]);
    }

    // Check if a valid date range is selected
    this.isDateRangeSelected = !isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime());
  }

  ngOnInit() {

    this.enabledMonths.forEach(month => {
      this.myForm.addControl(month, this.formBuilder.control(''));
    });
  }

  
  
  selectedTab: string = 'home';

  HomeClicked() {
    this.selectedTab = 'home';
  }

  AdminClicked() {
    this.selectedTab = 'admin';
  }

  

  OnSubscribe() {
    this.subscribeService.OnSubscribe('new header component')
  }

}
