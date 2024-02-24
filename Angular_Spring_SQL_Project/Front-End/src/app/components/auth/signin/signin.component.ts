// signin.component.ts

import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private toastService: ToastrService
    ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signIn() {
    if (this.signInForm.valid) {

      this.authService.signin(this.signInForm.value)

          .subscribe( {
            next: (res)   => { 
              console.log("Response: ", res) 
              this.toastService.success('Login successful!', 'Success');
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