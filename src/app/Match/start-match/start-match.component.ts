import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-start-match',
  templateUrl: './start-match.component.html',
  styleUrls: ['./start-match.component.css']
})
export class StartMatchComponent implements OnInit {

  nextPage: boolean = false;
  startMatch: FormGroup;
  nextSubmitted = false;
  errorNextPage;
  teams;
  team1Players;
  team2Players;
  team1True = false;
  team2True = false;
  default = ['as','asd','asdf']
  team1PlayersName;
  team2PlayersName;
  constructor(private router: Router, private formBuilder: FormBuilder, private matchService:MatchService) {
    this.startMatch = this.formBuilder.group({
      team1: ['', Validators.required],
      team2: ['', Validators.required],
      tossteam: ['',Validators.required],
      opted: ['',Validators.required],
      overs: ['', Validators.required],
      striker: ['',Validators.required],
      nonStriker: ['',Validators.required],
      bowler: ['']
    })
  }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(){
    this.matchService.getTeams().subscribe(result =>{
      this.teams = result.Teams;
    })
  }
  next(){
    this.nextSubmitted = true;
    this.team2True = false;
    this.team1True = false;
    let team1Code = this.startMatch.controls.team1.value;
    let team2Code = this.startMatch.controls.team2.value;
    let team1Valid = this.startMatch.controls.team1.valid;
    let team2Valid = this.startMatch.controls.team2.valid;
    let tossTeam = this.startMatch.controls.tossteam.valid;
    let opted = this.startMatch.controls.opted.valid;
    let Overs = this.startMatch.controls.overs.valid;
    this.teams.forEach(element => {
      if(element.teamCode == team1Code){
        this.team1True = true;
      }
      else if(element.teamCode == team2Code){
        this.team2True = true;
      }
    });
    if(team1Valid && team2Valid && tossTeam && opted && Overs && this.team1True && this.team2True){
    this.nextPage = true;
    this.matchService.getTeam(team1Code).subscribe(teamList =>{
      this.team1Players = teamList.message.players;
    })
    this.matchService.getTeam(team2Code).subscribe(teamList =>{
      this.team2Players = teamList.message.players;
    })
    }
    else{
    this.errorNextPage = "All fields are Required";
    }
  }

  back(){
    this.nextPage = !this.nextPage;
  }

  scorecard(){
    var controls = this.startMatch.controls
    var valuePasstoScoreCard = {
      "striker":controls.striker.value,
      "nonStriker":controls.nonStriker.value,
      "bowler":controls.bowler.value,
      "toss":controls.tossteam.value,
      "opted":controls.opted.value,
      "playersTeam1":this.team1Players,
      "playersTeam2":this.team2Players
    }
    this.router.navigate(['/score-card'],{state:valuePasstoScoreCard});
  }
}
