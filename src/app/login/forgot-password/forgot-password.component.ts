import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  message;
  phoneNo=null;
  pass;
  confirmPass;
  phoneNoChecked = false;
  passNotMatch = false;
  resultMessage;
  spinner = false;
  userId;
  errorMessage;
  spinnerChangePass = false;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private toast: ToastrService, private dialogRef: MatDialogRef<ForgotPasswordComponent>, private loginService: LoginService) {
    if (data) {
      this.message = data.name;
    }
  }

  ngOnInit(): void {
  }

  checkPhoneNo() {
    this.spinner = true;
    this.phoneNoChecked = false;
    this.loginService.checkPhoneNo(this.phoneNo).subscribe(result =>{
      this.userId = result.message.userId;
      this.toast.success("Phone No is Verified");
      this.spinner = false;
      this.phoneNoChecked = true;
    },err =>{
      this.toast.error("Phone No is not Registered");
      this.spinner = false;
      this.phoneNoChecked = false;
    })
  }

  changePassword() {
    this.errorMessage = "";
    const regex = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!$#?&])[A-Za-z\d@$!@%*#?&]{8,20}$/);
    if (this.pass == this.confirmPass) {
      if (regex.test(this.pass)) {
        this.spinnerChangePass = true;
        this.loginService.changePassword(this.userId,this.pass).subscribe(result =>{
          this.toast.success("Your Password is Changed");
          this.resultMessage = result;
          this.spinnerChangePass = false;
          this.dialogRef.close();
        },err =>{
          this.spinner = false
          this.toast.error("Please Try again Later");
        })
      }
      else{
        this.errorMessage = "Password pattern did not match"
      }
    }
    else{
      this.errorMessage = "Your Password did not match";
    }
  }
}
