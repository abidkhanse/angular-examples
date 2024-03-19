import {Component, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {AdminService} from "../../../../services/admin/admin.service";
import {ActivatedRoute, Router} from "@angular/router";

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
    private router: ActivatedRoute
  ) { }



  ngOnInit(): void {

    this.router.params.subscribe(params => {
      this.category_id = params['category-id']
    })

    console.log("category_id", this.category_id)

    this.getAllProducts()

  }

  getAllProducts() {

    this.products = []
    this.service.getAllProductsByCategory(this.category_id).subscribe((res) => {
      res.forEach(element  => {
        element.img = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element)
      })
      console.log("Result " , res)
    })
  }

}
