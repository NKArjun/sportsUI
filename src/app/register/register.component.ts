import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  showSpinner = false;
  showTerms = false;
  valid = true;
  isLoggedIn = 'false';
  user: SocialUser;
  errorMessage: String;
  constructor(private router: Router, private formBuilder: FormBuilder, private toast: ToastrService, private _snackBar: MatSnackBar, private registerService: RegisterService, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      password: ['', [Validators.required, , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!$#?&])[A-Za-z\d@$!@%*#?&]{8,20}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9\._%+-]*[a-z0-9]@[a-z]+\.com$/)]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^[7-9][0-9]{9}$/)]]
    })
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.showSpinner = true;
      let form = this.registerForm.controls;
      let register = {
        "firstName": form.firstName.value,
        "lastName": form.lastName.value,
        "password": form.password.value,
        "phoneNo": form.phoneNo.value,
        "email": form.email.value
      }

      this.registerService.register(register).subscribe(result => {
        this.showSpinner = false;
        this.errorMessage = "";
        this._snackBar.open("Successfully Registered you will redirect to login page please wait", "Ok", {
          duration: 5000,
          verticalPosition: "top",
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      }, err => {
        this.showSpinner = false;
        if(err.status == 500)
        this.errorMessage = "This MailId is already Registered";
        else
        this.errorMessage = "Please Try again later";
      })
    }
  }

  terms(){
    this.showTerms = true;
  }

  back() {
    this.showTerms = false;
    // this.router.navigate(['/welcome']);
  }

  signInwithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      this.router.navigate(['/login']);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
