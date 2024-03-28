import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";

import {Router} from "@angular/router";
import {CustomerService} from "../../../../services/customer/customer.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  categories: any         = []
  filteredCategories: any = []
  tempCategories   = []
  searchTerm= '';

  @ViewChild('searchInput') searchInput: ElementRef;
  constructor( private service: CustomerService, private router: Router) { }
  ngOnInit() {
    this.getAllCategories();
  }


  getAllCategories(){

    this.categories = []
    this.service.getAllCategories().subscribe((res) => {
      res.forEach(element  => {
        element.img = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element)
      })
      console.log("Result " , res)
      this.tempCategories = this.categories
    })
  }


  viewProducts(category: any) {
    this.router.navigateByUrl(`/customer/${category.id}/products`);
  }

}
