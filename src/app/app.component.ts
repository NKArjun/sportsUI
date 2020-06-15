import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './login/user';
import { TeamsService } from './teams/teams.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loginTitle = 'Login';
    userName: string;
    loggedUser: User;
    showSpinnerPage = false;
    userDetail;
    constructor(private _router: Router, private teamService: TeamsService, private toast: ToastrService) { }

    ngDoCheck(): void {
        this.loggedUser = new User();
        this.loggedUser.userId = sessionStorage.getItem('userId');
    }

    ngOnInit() {
        this.getUserDetails();
    }

    getUserDetails() {
        let userId = sessionStorage.getItem('userId');
        console.log(userId);
        if (userId != null) {
            this.showSpinnerPage = true;
            this.teamService.getUser(userId).subscribe(data => {
                this.showSpinnerPage = false;
                this.userDetail = data.user;
                localStorage.setItem('userDetail', this.userDetail);
            })
        }
    }

    register() {
        this._router.navigate(['/register']);
    }

    login() {
        this._router.navigate(['/login']);
    }

    logout() {
        sessionStorage.removeItem('userId');
        this._router.navigate(['/login']);
    }

    accept(notification) {
        this.userDetail.notifications = this.userDetail.notifications.filter(ele => {
            return (ele.joinUserId != notification.joinUserId);
        })
        sessionStorage.setItem('userDetail', JSON.stringify(this.userDetail));
        notification.userId = sessionStorage.getItem('userId');
        this.teamService.acceptPlayer(notification).subscribe(result => {
            this.toast.success("Accepted")
        })
    }

    reject(){
        
    }
}
