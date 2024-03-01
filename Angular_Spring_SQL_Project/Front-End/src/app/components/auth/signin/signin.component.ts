// signin.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LocaldbService } from '../../../services/storage/localdb.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['abid@gmail.com', [Validators.required, Validators.email]],
      password: ['admin', Validators.required]
    });
  }

  signIn() {
    if (this.signInForm.valid) {

      this.authService.signin(this.signInForm.value)

          .subscribe( {

            next: (res)   => { 

              console.log("Status: ", res.status) 
              console.log("Token: ", res.token) 

              LocaldbService.saveToken(res.token)
              LocaldbService.saveRole(res.role)
              this.toastService.success('Login successful!', 'Success');
              
              if(res.role === "ADMIN") {
                this.router.navigateByUrl("admin/dashboard")
              } else if(res.role === "USER") {
                this.router.navigateByUrl("customer/dashboard")
              }
              
            },
            error: (err)  => {
              console.log("Error: ", err)
              this.toastService.error(err.error, "Error")
            },
            complete: ()  => console.log("Exerything looks good")
          })
    }
  }
}