import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CustomerService} from "../../../../services/customer/customer.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent implements OnInit {

  products: any = []
  category_id : any

  constructor (
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastrService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.category_id = params['category-id']
    })
    console.log("category_id", this.category_id)
    this.getAllProducts()

  }

  getAllProducts(){

    this.products = []
    this.service.getAllProductsByCategory(this.category_id)
      .subscribe( {
        next: (res)   => {
          res.forEach(element  => {
            element.img = 'data:image/jpeg;base64,' + element.returnedImg;
            this.products.push(element)
          })
          console.log("Result " , res)
        },

        error: (err)  => {
          console.log("Error", err);
          console.log("Status", err.status);
        },

        complete: ()  =>  console.log("All products retrieved")

      })
  }
}
