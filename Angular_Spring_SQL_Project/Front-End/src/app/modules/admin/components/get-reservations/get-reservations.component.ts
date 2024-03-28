import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AdminService} from "../../../../services/admin/admin.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-get-reservations',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './get-reservations.component.html',
  styleUrl: './get-reservations.component.css'
})

export class GetReservationsComponent implements OnInit {

  reservations = []

  constructor( private fb: FormBuilder,
               private adminService: AdminService,
               private toastService: ToastrService,
  )
  { }

  ngOnInit(): void {

    this.adminService.getAllReservations().subscribe( {
      next: (res)   => {
        this.reservations  = res
        console.log("reservations",this.reservations)
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

  getDate(dateTime: string) {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleTimeString()
  }

  getTime(dateTime: string) {
    const dateObject = new Date(dateTime);
    return dateObject.toLocaleDateString()
  }

  disableAcceptButton(status: string): boolean {
    return status === 'APPROVED'
  }

  accept(reservationId : number) {
    this.changeReservationStatus(reservationId, 'approved')
  }

  disableDeclineButton(status: string): boolean {
    return status === 'DISAPPROVED'
  }

  decline(reservationId : number) {
    this.changeReservationStatus(reservationId, 'DISAPPROVED')
  }

  changeReservationStatus(reservationId : number, status: string) {

    this.adminService.changeReservationStatus(reservationId, status).subscribe( {

      next: (res)   => {
        console.log("Result", res );
        this.toastService.success('Status ' + res.message  +  ' !', 'Success', {
          positionClass: 'toast-bottom-right'
        });

        console.log("Reservations", this.reservations)

        this.reservations = this.reservations.map((res) => {

          if (res.id === reservationId) {
            return {...res, reservationStatus: status.toUpperCase()}
          }
          return res

        })

        console.log("CHANGED RES", this.reservations)

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
