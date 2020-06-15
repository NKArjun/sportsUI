import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showSpinner = false;
  users: any[];
  errorMessage: String;
  valid = true;
  isLoggedIn = 'false';
  user: SocialUser;
  constructor(private router: Router, public dialog: MatDialog,private toastr: ToastrService, private formBuilder: FormBuilder, private loginService: LoginService, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9]*@[a-z]+.com$/)]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  show() {

  }

  login(): void {
    if (this.loginForm.valid) {
      this.showSpinner = true;
      this.errorMessage = "";
      this.loginService.checkLogin(this.loginForm.controls).subscribe(success => {
        sessionStorage.setItem("userName", success.message.firstName + " " + success.message.lastName);
        sessionStorage.setItem("userId", success.message.userId);
        sessionStorage.setItem("userDetail", JSON.stringify(success.message));
        this.showSpinner = false;
        this.router.navigate(['/dashboard']);
      }, err => {
        this.showSpinner = false;
        this.errorMessage = "Your EmailId or Password is wrong.Enter Correct Credentials";
      })
    }
  }

  forgotPassword(){
    const dialogRef = this.dialog.open(ForgotPasswordComponent,{
      width: '300px',
      data:{name:sessionStorage.getItem('userName')}
    })
    dialogRef.afterClosed().subscribe(result =>{
      console.log('afterClosed')
    })
  }

  back() {
    this.router.navigate(['/welcome']);
  }

  signInwithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

}

function validateEmail(c: FormControl) {
  let EMAIL_REGEXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return EMAIL_REGEXP.test(c.value) ? null : {
    emailError: {
      message: "Email is invalid"
    }
  };

}
