import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {AdminService} from "../../../../services/admin/admin.service";
import {FormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
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
  constructor( private service: AdminService, private router: Router) { }
  ngOnInit() {
    this.getAllCategories();
    this.applyFilter();
  }

  // This filter is working but can be improved
  applyFilter() {


    console.log("applyFilter", this.searchTerm.toLowerCase())
    this.filteredCategories = this.categories.filter(
      category => category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.searchTerm.trim().length == 0) {
      this.categories = this.tempCategories
    } else {
      this.categories = this.filteredCategories
    }

  }

  // Add pagination
  getAllCategories() {

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

  addInfo(category: any) {
    this.router.navigateByUrl(`/admin/${category.id}/product-info`);
  }

  viewProducts(category: any) {
    this.router.navigateByUrl(`/admin/${category.id}/products`);
  }

}
