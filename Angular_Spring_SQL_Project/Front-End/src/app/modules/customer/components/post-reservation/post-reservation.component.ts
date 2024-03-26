import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {UtilityService} from "../../../../services/utils/utility.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../../../../services/customer/customer.service";
import {LocaldbService} from "../../../../services/storage/localdb.service";
import {ToastrService} from "ngx-toastr";


// @ts-ignore
@Component({
  selector: 'app-post-reservation',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './post-reservation.component.html',
  styleUrl: './post-reservation.component.css'
})

export class PostReservationComponent implements OnInit {

  tableTypes: string[] = UtilityService.getTableTypes()
  validateForm: FormGroup;

  constructor( private fb: FormBuilder,
               private customerService: CustomerService,
               private toastService: ToastrService,
  )
  { }

  ngOnInit(): void {
    this.validateForm = this.fb.group ({
      tableType: ['', Validators.required],
      dateTime: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  onSubmit() {

    console.log("Selected values :", this.validateForm.value);

    this.customerService.postReservation(this.validateForm.value)

      .subscribe( {

        next: (res)   => {

          console.log("Status: ", res.status)

          this.toastService.success('Table reservation request is received!', 'Success' , {
            positionClass: 'toast-bottom-right'
          });

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
