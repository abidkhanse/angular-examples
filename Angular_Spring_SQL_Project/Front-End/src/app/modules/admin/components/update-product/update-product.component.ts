import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AdminService} from "../../../../services/admin/admin.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {

  product_id : any
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastService: ToastrService,
    private router: ActivatedRoute  ) {  }

  ngOnInit(): void {

    this.router.params.subscribe(params => {
      this.product_id = params['product-id']
    })

    console.log("category_id", this.product_id)

    this.getProductById();

  }

  getProductById() {

    this.adminService.getProductById(this.product_id).subscribe( {

      next: (res)   => {

        console.log("Result", res );


      },

      error: (err)  => {
        console.log("Error", err);
        console.log("Status", err.status);
      },
      complete: ()  =>  console.log("Product deleted")
    })

  }



}
