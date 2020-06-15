import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loginForm: FormGroup;
  userName: String;
  showSpinnerPage = false;
  password: String;
  profileList;
  sports;
  uId;
  constructor(private profileService: ProfileService, private router: Router, private _snackBar: MatSnackBar, private toast: ToastrService) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName');
    this.uId = sessionStorage.getItem('userId');
    this.showSpinnerPage = true;
    this.profileService.getProfile(this.uId).subscribe(data => {
      this.showSpinnerPage = false;
      this.profileList = data.message;
    })
  }

  sport(form) {
    this.sports = form.target.value;
  }

  edit() {
    if (this.sports == 'cricket') {
      this.router.navigate(['/cricket-profile/edit-profile']);
    }
    if (this.sports == null) {
      this._snackBar.open("Please Select Sport to Continue", "Ok", {
        duration: 5000,
        verticalPosition: "top",
      });
    }
  }

  view() {
    var uid = sessionStorage.getItem('userId');
    var uname = sessionStorage.getItem('userName');
    if (this.sports == 'cricket') {
      this.router.navigate(['/cricket-profile/' + uid + '/' + uname])
    }
    if (this.sports == null) {
      this._snackBar.open("Please Select Sport to Continue", "Ok", {
        duration: 5000,
        verticalPosition: "top",
      });
    }
  }

  showMessage() {
    this.toast.error("I'm a toast!");
    this._snackBar.open("message", "action", {
      duration: 2000,
      verticalPosition: "top",
    });
  }
}
