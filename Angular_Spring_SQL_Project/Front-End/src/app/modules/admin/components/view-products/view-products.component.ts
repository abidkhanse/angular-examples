import {Component, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {AdminService} from "../../../../services/admin/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [ NgForOf, FormsModule ],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent implements OnInit {

  products: any = []
  category_id : any

  constructor (
    private service: AdminService,
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

  getAllProducts() {

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
        complete: ()  =>  console.log("Category created")
      })

  }

  deleteProduct(id) {

    console.log("productId", id)
    this.service.deleteProductById(id)
      .subscribe( {
        next: (res)   => {
          this.getAllProducts()
          console.log("Result", res.id );
          this.toastService.success(res.message, 'Success', {
            positionClass: 'toast-bottom-right'
          });
        },

        error: (err)  => {
          console.log("Error", err);
          console.log("Status", err.status);
        },
        complete: ()  =>  console.log("Product deleted")
      })
  }

  updateProduct(id) {

    this.router.navigateByUrl(`/admin/product/${id}`);


    /*
    this.service.updateProduct(id)

      .subscribe( {

        next: (res)   => {

          this.getAllProducts()
          console.log("Result", res.id );
          this.toastService.success(res.message, 'Success', {
            positionClass: 'toast-bottom-right'
          });
        },

        error: (err)  => {
          console.log("Error", err);
          console.log("Status", err.status);
        },
        complete: ()  =>  console.log("Product deleted")
      })
    */

  }
}
