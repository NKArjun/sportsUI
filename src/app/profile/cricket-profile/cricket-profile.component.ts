import { Component, OnInit } from '@angular/core';
import { CricketProfileService } from './cricket-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cricket-profile',
  templateUrl: './cricket-profile.component.html',
  styleUrls: ['./cricket-profile.component.css']
})
export class CricketProfileComponent implements OnInit {

  constructor(private cricketProfile:CricketProfileService,private route:ActivatedRoute) { }
  uId;
  userName
  profileList;
  showSpinnerPage = false;
  ngOnInit(): void {
    this.getPlayerProfile();
  }

  getPlayerProfile(){
    this.showSpinnerPage = true;
    this.userName = sessionStorage.getItem('userName');
    this.route.params.subscribe(param => {this.uId = param['uId'];this.userName = param['userName']});
    this.cricketProfile.getPlayerProfile(this.uId).subscribe(result =>{
      this.showSpinnerPage = false;
      this.profileList = result.message;
    })
  }

}
