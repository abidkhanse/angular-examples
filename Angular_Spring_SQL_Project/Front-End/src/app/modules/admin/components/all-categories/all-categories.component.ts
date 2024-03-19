import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AdminService} from "../../../../services/admin/admin.service";

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css'
})

export class AllCategoriesComponent   {

}
