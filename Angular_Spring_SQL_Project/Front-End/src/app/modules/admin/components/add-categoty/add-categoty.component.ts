import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-add-categoty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-categoty.component.html',
  styleUrl: './add-categoty.component.css'
})

export class AddCategotyComponent implements OnInit {

  categoryForm: FormGroup;
  selectedImage: any;
  selectFile: File

  constructor(
      private formBuilder: FormBuilder,
      private adminService: AdminService
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

    formData.append("img",categoryImg)
    formData.append("name",categoryName)
    formData.append("description",categoryType)

    this.adminService.postCategory(formData)
    .subscribe( {

      next: (res)   => { 
        console.log("Response", res)
      },

      error: (err)  => {
        console.log("Error: ", err)
      },

      complete: ()  => console.log("File uploaded")

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