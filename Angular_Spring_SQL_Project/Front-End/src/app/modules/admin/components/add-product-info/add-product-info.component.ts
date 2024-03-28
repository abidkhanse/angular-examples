import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {AdminService} from "../../../../services/admin/admin.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-product-info',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-product-info.component.html',
  styleUrl: './add-product-info.component.css'
})

export class AddProductInfoComponent implements OnInit {

  productForm: FormGroup;
  selectedImage: any;
  selectFile: File
  category_id : any

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastService: ToastrService,
    private router: ActivatedRoute
  )
  {}

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({

      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDescription: ['', Validators.required],
      productImage: [null, Validators.required]

    });

    this.router.params.subscribe(params => {
      this.category_id = params['category-id']
    })

  }

  onSubmit() {

    const productName         = this.productForm.get('productName').value;
    const productPrice        = this.productForm.get('productPrice').value;
    const productDescription  = this.productForm.get('productDescription').value;
    const productImage        = this.productForm.get('productImage').value;

    const formData : FormData = new FormData()

    formData.append("name", productName)
    formData.append("price", productPrice)
    formData.append("description", productDescription)
    formData.append("img", productImage)


    this.adminService.postProduct(this.category_id, formData)

      .subscribe( {

        next: (res)   => {
          console.log("Result", res.id + " " + res.name );
          this.toastService.success('Product ' + res.name  +  ' created successfully!', 'Success', {
            positionClass: 'toast-bottom-right'
          });

           // navigate here

        },

        error: (err)  => {
          console.log("Error", err);
          console.log("Status", err.status);
          this.toastService.error('Unable to create product ' + err.error.name + ' Code ' + err.error.status, 'Error', {
            positionClass: 'toast-bottom-right'
          });
        },

        complete: ()  =>  console.log("Product created")

      })

  }


  onFileSelected(event: any) {

    this.selectFile = event.target.files[0];
    if (this.selectFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.productForm.patchValue({
          productImage: this.selectFile
        });
      };
      reader.readAsDataURL(this.selectFile);
    }

  }

}
