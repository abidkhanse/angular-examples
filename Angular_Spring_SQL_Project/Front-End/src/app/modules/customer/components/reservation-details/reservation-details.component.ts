import {Component, OnInit} from '@angular/core';
import {UtilityService} from "../../../../services/utils/utility.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services/customer/customer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private customerService: CustomerService,
               private toastService: ToastrService,
  )
  { }

  ngOnInit(): void {

    this.customerService.getAllReservations().subscribe( {

      next: (res)   => {

        console.log("Status: ", res)


      },
      error: (err)  => {
        console.log("Error: ", err)
        this.toastService.error(err.error, "Error", {
          positionClass: 'toast-bottom-right'
        });
      },
      complete: ()  => console.log("Everything looks good")
    })

  }
}


