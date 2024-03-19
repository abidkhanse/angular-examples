import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../../services/admin/admin.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-categoty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})

export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  selectedImage: any;
  selectFile: File

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastService: ToastrService,
  )
  {}

  ngOnInit(): void {

    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryType: ['', Validators.required],
      categoryImage: [null, Validators.required]
    });

  }

  onSubmit() {

    const categoryName = this.categoryForm.get('categoryName').value;
    const categoryType = this.categoryForm.get('categoryType').value;
    const categoryImg  = this.categoryForm.get('categoryImage').value;

    const formData : FormData = new FormData()

    formData.append("name", categoryName)
    formData.append("description", categoryType)
    formData.append("img", categoryImg)

    this.adminService.postCategory(formData)

      .subscribe( {

        next: (res)   => {
          console.log("Result", res.id + " " + res.name );
          this.toastService.success('Category ' + res.name  +  ' created successfully!', 'Success', {
            positionClass: 'toast-bottom-right'
          });
        },

        error: (err)  => {
          console.log("Error", err);
          console.log("Status", err.status);
          this.toastService.error('Unable to create category ' + err.error.name + ' Code ' + err.error.status, 'Error', {
            positionClass: 'toast-bottom-right'
          });
        },

        complete: ()  =>  console.log("Category created")

      })

  }


  onFileSelected(event: any) {

    this.selectFile = event.target.files[0];

    if (this.selectFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.categoryForm.patchValue({
          categoryImage: this.selectFile
        });
      };
      reader.readAsDataURL(this.selectFile);

    }

  }

}
