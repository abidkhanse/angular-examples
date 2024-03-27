import {Component, OnInit} from '@angular/core';
import {UtilityService} from "../../../../services/utils/utility.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services/customer/customer.service";
import {ToastrService} from "ngx-toastr";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent implements OnInit {

  reservations: any

  constructor( private fb: FormBuilder,
               private customerService: CustomerService,
               private toastService: ToastrService,
  )
  { }

  ngOnInit(): void {

    this.customerService.getAllReservations().subscribe( {

      next: (res)   => {

        this.reservations  = res

        console.log("reservations",this.reservations)


      },
      error: (err)  => {
        console.log("Error: ", err)
        this.toastService.error("Book a table", "No reservation found", {
          positionClass: 'toast-bottom-right'
        });
      },
      complete: ()  => console.log("Everything looks good")
    })

  }

  getDate(dateTime: string) {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleTimeString()
  }

  getTime(dateTime: string) {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleDateString()
  }
}


