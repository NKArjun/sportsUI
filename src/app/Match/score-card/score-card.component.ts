import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  showWicketPage = false;
  nextBowler;
  bowlerDetails = [];
  showNextBowler: Boolean = false;
  score: number = 0;
  countBall: number = 0;
  wicket: number = 0;
  isStrike = true;
  math = Math;
  previousScoreCardDetails;
  bowler;
  count = 0;
  flag = 0;
  wideRuns;
  scorecardDetails = {
    "isStrike": true,
    "striker": null,
    "nonStriker": null,
    "bowler": null,
    "toss": null,
    "optTo": null,
    "runs": 0,
    "wickets": 0,
    "overs": 0,
    "balls": 0,
    "players1Name": [],
    "players2Name": [],
    "strikerUserId": null,
    "strikerRuns": 0,
    "nonStrikerRuns": 0,
    "striker4s": 0,
    "nonStrikerUserId": null,
    "nonStriker4s": 0,
    "striker6s": 0,
    "nonStriker6s": 0,
    "strikerBalls": 0,
    "nonStrikerBalls": 0,
    "strikerSR": "0",
    "nonStrikerSR": "0",
    "bowlerUserId": null,
    "bowlerBalls": 0,
    "bowlerMaidens": 0,
    "bowlerRuns": 0,
    "bowlerWickets": 0,
    "bowlerER": 0
  }
  wicketForm: FormGroup;
  constructor(private router: Router, private formbuilder: FormBuilder) {
    this.wicketForm = this.formbuilder.group({
      wicket: [''],
      helpedPlayer:[''],
      batsManCrossed:[''],
      newBatsman: ['']
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(){
    if(this.showNextBowler == false && this.showWicketPage == false){
    if(localStorage.getItem('span')!=null){
      document.getElementById('addrun').innerHTML = localStorage.getItem('span');
    }
  }
  }

  ngDoCheck(): void {
    var previousState;
    if (localStorage.getItem('previousState') == null) {
      previousState = history.state;
      this.scorecardDetails.striker = previousState.striker;
      this.scorecardDetails.nonStriker = previousState.nonStriker;
      this.scorecardDetails.bowler = previousState.bowler;
      this.scorecardDetails.toss = previousState.toss;
      this.scorecardDetails.optTo = previousState.opted;
      this.scorecardDetails.players1Name = previousState.playersTeam1;
      this.scorecardDetails.players2Name = previousState.playersTeam2;
      previousState.playersTeam1.forEach(element => {
        var name = element.firstName + " " + element.lastName;
        if (name == this.scorecardDetails.striker) {
          this.scorecardDetails.strikerUserId = element.userId;
        }
        else if (name == this.scorecardDetails.nonStriker) {
          this.scorecardDetails.nonStrikerUserId = element.userId;
        }
      });
      previousState.playersTeam2.forEach(element => {
        var name = element.firstName + " " + element.lastName;
        if (name == this.scorecardDetails.bowler) {
          this.scorecardDetails.bowlerUserId = element.userId;
        }
      });
      
      try {
        localStorage.setItem('previousState', JSON.stringify(this.scorecardDetails));
      }
      catch{
        alert('Exceeded Storage Quota!')
      }
    }
    else {
      previousState = JSON.parse(localStorage.getItem('previousState'));
      this.scorecardDetails = previousState;
    }
    if (localStorage.getItem('bowlerDetails') != null) {
      this.bowlerDetails = JSON.parse(localStorage.getItem('bowlerDetails'));
    }
  }


  addScore(event) {

    var value = event.target.value;
    {
      var runs = parseInt(value);
      if (runs > 0) {
        this.flag = 1;
      }

      //Wide
      if (document.getElementById('wide')['checked'] == true) {
        this.previousScoreCardDetails = JSON.parse(localStorage.getItem('previousState'));
        this.wideRuns = runs + 1;
        this.scorecardDetails.runs += this.wideRuns;
        this.scorecardDetails.bowlerRuns += (runs + 1);
        localStorage.setItem('previousState', JSON.stringify(this.scorecardDetails));
        document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-dark mr-4">' + this.wideRuns + 'Wd</span>';
        document.getElementById('wide')['checked'] = false;
        this.flag = 1;
        if (this.scorecardDetails.isStrike) {
          if (runs == 4) {
            this.scorecardDetails.striker4s += 1;
          } else if (runs == 6) {
            this.scorecardDetails.striker6s += 1;
          }
          this.scorecardDetails.strikerRuns += runs;
          var SR = (this.scorecardDetails.strikerRuns / this.scorecardDetails.strikerBalls) * 100;
          this.scorecardDetails.strikerSR = SR.toFixed(2);
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = false;
          }
        }
        //Add Non Striker runs 
        else {
          if (runs == 4) {
            this.scorecardDetails.nonStriker4s += 1;
          } else if (runs == 6) {
            this.scorecardDetails.nonStriker6s += 1;
          }
          this.scorecardDetails.nonStrikerRuns += runs;
          var SR = (this.scorecardDetails.nonStrikerRuns / this.scorecardDetails.nonStrikerBalls) * 100;
          this.scorecardDetails.nonStrikerSR = SR.toFixed(2);
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = true;
          }
        }

      }

      //No Ball
      else if (document.getElementById('noball')['checked'] == true) {
        this.previousScoreCardDetails = JSON.parse(localStorage.getItem('previousState'));
        this.scorecardDetails.runs += runs;
        this.scorecardDetails.bowlerRuns += (runs + 1);
        document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-dark mr-4">' + (runs + 1) + 'NB</span>';
        localStorage.setItem('previousState', JSON.stringify(this.scorecardDetails));
        this.flag = 1;
        //Striker Runs
        if (this.scorecardDetails.isStrike) {
          if (runs == 4) {
            this.scorecardDetails.striker4s += 1;
          } else if (runs == 6) {
            this.scorecardDetails.striker6s += 1;
          }
          this.scorecardDetails.strikerRuns += runs;
          var SR = (this.scorecardDetails.strikerRuns / this.scorecardDetails.strikerBalls) * 100;
          this.scorecardDetails.strikerSR = SR.toFixed(2);
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = false;
          }
        }
        //Add Non Striker runs 
        else {
          if (runs == 4) {
            this.scorecardDetails.nonStriker4s += 1;
          } else if (runs == 6) {
            this.scorecardDetails.nonStriker6s += 1;
          }
          this.scorecardDetails.nonStrikerRuns += runs;
          var SR = (this.scorecardDetails.nonStrikerRuns / this.scorecardDetails.nonStrikerBalls) * 100;
          this.scorecardDetails.nonStrikerSR = SR.toFixed(2);
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = true;
          }
        }
        document.getElementById('noball')['checked'] = false;

      }

      //Byes
      else if (document.getElementById('byes')['checked'] == true) {
        this.previousScoreCardDetails = JSON.parse(localStorage.getItem('previousState'));
        document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-dark mr-4">' + runs + 'B</span>';
        this.scorecardDetails.runs += runs;
        this.scorecardDetails.balls += 1;
        this.scorecardDetails.bowlerRuns += runs;
        this.scorecardDetails.bowlerBalls += 1;
        localStorage.setItem('previousState', JSON.stringify(this.scorecardDetails));
        if (this.scorecardDetails.isStrike) {
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = false;
          }
        }
        else if (this.scorecardDetails.isStrike == false) {
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = true;
          }
        }
        document.getElementById('byes')['checked'] = false;
      }

      //Leg Byes
      else if (document.getElementById('legbyes')['checked'] == true) {
        this.previousScoreCardDetails = JSON.parse(localStorage.getItem('previousState'));
        document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-dark mr-4">' + runs + 'LB</span>';
        this.scorecardDetails.runs += runs;
        this.scorecardDetails.bowlerBalls += 1;
        this.scorecardDetails.balls += 1;
        this.scorecardDetails.bowlerRuns += runs;
        localStorage.setItem('previousState', JSON.stringify(this.scorecardDetails));
        if (this.scorecardDetails.isStrike) {
          this.scorecardDetails.strikerBalls += 1;
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = false;
          }
        }
        else if (this.scorecardDetails.isStrike == false) {
          this.scorecardDetails.nonStrikerBalls += 1;
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = true;
          }
        }
        document.getElementById('legbyes')['checked'] = false;
      }

      //Wicket
      else if (document.getElementById('wicket')['checked'] == true) {
        this.previousScoreCardDetails = JSON.parse(localStorage.getItem('previousState'));
        document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-danger mr-4">W</span>';
        this.scorecardDetails.wickets += 1;
        this.scorecardDetails.balls += 1;
        this.scorecardDetails.overs += Math.floor(this.scorecardDetails.balls / 6);
        this.scorecardDetails.balls = this.scorecardDetails.balls % 6;
        this.scorecardDetails.bowlerBalls += 1;
        //Add Striker Runs
        if(this.scorecardDetails.isStrike){
          this.scorecardDetails.strikerBalls +=1;
          this.scorecardDetails.strikerRuns += runs;
        }
        //Add Non Striker Runs
        else if(this.scorecardDetails.isStrike == false){
          this.scorecardDetails.strikerRuns += runs;
          this.scorecardDetails.strikerBalls += 1;
        }
        document.getElementById('wicket')['checked'] = false;
        localStorage.setItem('previousState', JSON.stringify(this.scorecardDetails));
        this.showWicketPage = true;
        localStorage.setItem('span',document.getElementById('addrun').innerHTML);
      }

      //update ScoreCard Details
      else {
        this.previousScoreCardDetails = JSON.parse(localStorage.getItem('previousState'));
        document.getElementById('noball')['checked'] = false;
        this.scorecardDetails.runs += runs;
        this.scorecardDetails.balls += 1;
        this.scorecardDetails.overs += Math.floor(this.scorecardDetails.balls / 6);
        this.scorecardDetails.balls = this.scorecardDetails.balls % 6;
        if (runs == 0)
          document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-light mr-4">' + runs + '</span>';
        if (runs > 0 && runs < 4)
          document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-dark mr-4">' + runs + '</span>';
        else if (runs == 4)
          document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-warning mr-4">' + runs + '</span>';
        else if (runs == 5)
          document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-primary mr-4">' + runs + '</span>';
        else if (runs == 6)
          document.getElementById('addrun').innerHTML += '<span class="badge badge-pill badge-success mr-4">' + runs + '</span>';
        //Add Striker Runs
        if (this.scorecardDetails.isStrike) {
          if (runs == 4) {
            this.scorecardDetails.striker4s += 1;
          } else if (runs == 6) {
            this.scorecardDetails.striker6s += 1;
          }
          this.scorecardDetails.strikerRuns += runs;
          this.scorecardDetails.strikerBalls += 1;
          var SR = (this.scorecardDetails.strikerRuns / this.scorecardDetails.strikerBalls) * 100;
          this.scorecardDetails.strikerSR = SR.toFixed(2);
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = false;
          }
        }
        //Add Non Striker runs 
        else {
          if (runs == 4) {
            this.scorecardDetails.nonStriker4s += 1;
          } else if (runs == 6) {
            this.scorecardDetails.nonStriker6s += 1;
          }
          this.scorecardDetails.nonStrikerRuns += runs;
          this.scorecardDetails.nonStrikerBalls += 1;
          var SR = (this.scorecardDetails.nonStrikerRuns / this.scorecardDetails.nonStrikerBalls) * 100;
          this.scorecardDetails.nonStrikerSR = SR.toFixed(2);
          if (runs % 2 == 1) {
            this.scorecardDetails.isStrike = true;
          }
        }
        //Add Bowler Runs
        this.scorecardDetails.bowlerRuns += runs;
        this.scorecardDetails.bowlerBalls += 1;
        localStorage.setItem('previousState', JSON.stringify(this.scorecardDetails));
        localStorage.setItem('span',document.getElementById('addrun').innerHTML);
        document.getElementById('addrun').innerHTML = localStorage.getItem('span');
      }

    }

    //change Bowler
    if (this.scorecardDetails.balls == 0 && document.getElementById('wide')['checked'] == false && document.getElementById('noball')['checked'] == false) {
      localStorage.removeItem('span');
      if (this.flag == 0) {
        this.scorecardDetails.bowlerMaidens += 1;
      }
      localStorage.setItem('previousState', JSON.stringify(this.scorecardDetails));
      this.flag = 0;
      var bowler = {
        "bowlerRuns": this.scorecardDetails.bowlerRuns,
        "bowlerBalls": this.scorecardDetails.bowlerBalls,
        "bowlerUserId": this.scorecardDetails.bowlerUserId,
        "bowlerWickets": this.scorecardDetails.bowlerWickets,
        "bowlerER": this.scorecardDetails.bowlerER,
        "bowlerMaidens": this.scorecardDetails.bowlerMaidens,
        "bowler": this.scorecardDetails.bowler
      }
      this.bowlerDetails.push(bowler);
      localStorage.setItem('bowlerDetails', JSON.stringify(this.bowlerDetails));
      this.showNextBowler = !this.showNextBowler;
    }

  }//add score

  selectBowler(form) {
    let flag = 0;
    if (this.bowlerDetails?.length > 0) {
      this.bowlerDetails.forEach(element => {
        if (element.bowlerUserId == this.nextBowler.userId) {
          this.scorecardDetails.bowler = element.bowler;
          this.scorecardDetails.bowlerUserId = element.bowlerUserId;
          this.scorecardDetails.bowlerBalls = element.bowlerBalls;
          this.scorecardDetails.bowlerRuns = element.bowlerRuns;
          this.scorecardDetails.bowlerER = element.bowlerER;
          this.scorecardDetails.bowlerMaidens = element.bowlerMaidens;
          this.scorecardDetails.bowlerWickets = element.bowlerWickets;
          flag = 1;
        }
      });
    }
    if (flag == 0) {
      this.scorecardDetails.bowler = this.nextBowler.firstName + " " + this.nextBowler.lastName;
      this.scorecardDetails.bowlerBalls = 0;
      this.scorecardDetails.bowlerER = 0;
      this.scorecardDetails.bowlerMaidens = 0;
      this.scorecardDetails.bowlerRuns = 0;
      this.scorecardDetails.bowlerWickets = 0;
      this.scorecardDetails.bowlerUserId = this.nextBowler.userId;
    }
    this.scorecardDetails.isStrike = !this.scorecardDetails.isStrike;
    localStorage.setItem('previousState', JSON.stringify(this.scorecardDetails));
    this.showNextBowler = false;
  }

  //Select Next Batsman
  selectNextBatsman(){
  }

  //Undo
  Undo() {
    localStorage.setItem('previousState', JSON.stringify(this.previousScoreCardDetails));
  }

  //Back
  back(){
    this.showNextBowler = false;
    this.showWicketPage = false;
  }

  //Wicket Type
  wicketType(event) {
  }
}
