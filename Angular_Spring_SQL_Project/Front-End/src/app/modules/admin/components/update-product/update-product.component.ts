import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminService} from "../../../../services/admin/admin.service";
import {ToastrService} from "ngx-toastr";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {

  product_id : any
  productForm: FormGroup;
  selectedImage: any;
  selectFile: File
  imgChanged = false
  existingImage: string = null

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastService: ToastrService,
    private router: ActivatedRoute  ) {  }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({

      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDescription: ['', Validators.required],
      productImage: [null, Validators.required]

    });

    this.router.params.subscribe(params => {
      this.product_id = params['product-id']
    })

    console.log("category_id", this.product_id)

    this.getProductById();

  }

  // abid asks: how to navigate to the previous page, best practice
  onSubmit() {

    const productName         = this.productForm.get('productName').value;
    const productPrice        = this.productForm.get('productPrice').value;
    const productDescription  = this.productForm.get('productDescription').value;
    const productImage        = this.productForm.get('productImage').value;

    const formData : FormData = new FormData()

    console.log("formData", formData)

    formData.append("name", productName)
    formData.append("price", productPrice)
    formData.append("description", productDescription)
    if(this.imgChanged) {
      formData.append("img", productImage)
    }

    this.adminService.updateProduct(this.product_id, formData)

      .subscribe( {

        next: (res)   => {
          console.log("Result", res.id + " " + res.name );
          this.toastService.success('Product ' + res.name  +  ' updated successfully!', 'Success', {
            positionClass: 'toast-bottom-right'
          });
        },

        error: (err)  => {
          console.log("Error", err);
          console.log("Status", err.status);
          this.toastService.error('Unable to update product ' + err.error.name + ' Code ' + err.error.status, 'Error', {
            positionClass: 'toast-bottom-right'
          });
        },

        complete: ()  =>  console.log("Product created")

      })

  }


  // abid asks: what about other img extensions i-e png, bmp etc
  getProductById() {

    this.adminService.getProductById(this.product_id).subscribe( {

      next: (res)   => {

        this.productForm.get('productName').setValue(res.name);
        this.productForm.get('productPrice').setValue(res.price);
        this.productForm.get('productDescription').setValue(res.description);
        this.productForm.get('productImage').setValue(this.selectedImage = 'data:image/jpeg;base64,' + res.returnedImg);

        this.productForm.patchValue(res)

        console.log("Result", res );
      },

      error: (err)  => {
        console.log("Error", err);
        console.log("Status", err.status);
      },

      complete: ()  =>  console.log("Product Retrieved")

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
      this.imgChanged = true
      this.existingImage = null
    }

  }

}
