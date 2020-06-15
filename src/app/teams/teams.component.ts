import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TeamsService } from './teams.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})


export class TeamsComponent implements OnInit {

  teams;
  listFilter;
  userId:String;
  duplicateTeams:String;
  showSpinnerPage = false;
  constructor(private teamService:TeamsService,private toast: ToastrService) { }

  ngOnInit(): void {
   this.getTeams(); 
  }

  getTeams(){
    this.showSpinnerPage = true;
    this.userId = sessionStorage.getItem('userId');
    this.teamService.getTeams().subscribe(result =>{
      this.showSpinnerPage = false;
      this.teams = result.Teams;
      this.duplicateTeams = this.teams;
    })
  }

  searchText(){
    this.teams = this.duplicateTeams;
    if(this.listFilter.length >0){
      this.teams = this.teams.filter(team =>{
        return team.teamCode.indexOf(this.listFilter)!=-1;
      })
    }
  }

  joinTeam(team){
    var captainId = team.captainUserId;
    var teamCode = team.teamCode;
    var userId = sessionStorage.getItem('userId');
    console.log(userId);
    this.teamService.joinTeam(userId,captainId,teamCode).subscribe(result =>{
      this.toast.success("Request Send Successfully");
    },err =>{
      this.toast.error("Please Try again later Request Not Send")
    })
  }

}
