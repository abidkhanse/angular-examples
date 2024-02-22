import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.signupForm.valid) {

        // Accessing individual form controls
        const firstNameControl = this.signupForm.get('firstName');
        const lastNameControl = this.signupForm.get('lastName');
        const emailControl = this.signupForm.get('email');
        const passwordControl = this.signupForm.get('password');
      
        // Checking if the controls are valid
          // Accessing the values of the controls
          const firstNameValue = firstNameControl.value;
          const lastNameValue = lastNameControl.value;
          const emailValue = emailControl.value;
          const passwordValue = passwordControl.value;
      
          // Implement your signup logic here
          console.log('First Name:', firstNameValue);
          console.log('Last Name:', lastNameValue);
          console.log('email:',     emailValue);
          console.log('Password:', passwordValue);

          this.authService.signup(this.signupForm.value).subscribe( (res) => {
            console.log("Response : " + res)
          }

          )


    }

  }
}
