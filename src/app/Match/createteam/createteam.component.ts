import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatchService } from '../match.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./createteam.component.css']
})
export class CreateteamComponent implements OnInit {

  createTeamForm: FormGroup;
  playersDetails;
  showSpinner = false;
  players = [];
  teamCode;
  playerListSize: number = 1;
  show = true;
  cricket: boolean = false;
  error = new Array<boolean>(11);
  constructor(private formBuilder: FormBuilder, private toast: ToastrService, private createTeamService: MatchService, private _snackBar: MatSnackBar) {
    this.createTeamForm = this.formBuilder.group({
      sports: [''],
      ground: ['', Validators.required],
      location: ['', Validators.required],
      captainUserId: ['', Validators.required],
      playerIdArray: this.formBuilder.array([
        this.getPlayersIdField()
      ])
    })
  }

  ngOnInit(): void {
    this.getPlayerList();
    if (sessionStorage.getItem('teamCode') != null) {
      this.show = false;
      this.teamCode = sessionStorage.getItem('teamCode');
    }
  }

  getPlayerList() {
    this.createTeamService.getPlayers().subscribe(result => {
      this.playersDetails = result.message;
      this.error.fill(false);
    })
  }

  createTeam() {
    if (this.createTeamForm.valid) {
      this.error.fill(false);
      var nextContinue = true;
      let form = this.createTeamForm.controls;
      var player = this.createTeamForm.controls.playerIdArray.value;
      for (let i = 0; i < player.length; i++) {
        var flag = 0;
        this.playersDetails.forEach(element => {
          if (element.userId == player[i].playerId) {
            flag = 1;
            this.players.push(element);
          }
        });
        if (flag == 0) {
          this.error[i] = true;
          nextContinue = false;
        }
      }
      if (nextContinue) {
        this.showSpinner = true;
        let teamDetails = {
          "sport": form.sports.value,
          "players": this.players,
          "location": this.createTeamForm.controls.location.value,
          "ground": this.createTeamForm.controls.ground.value,
          "captainUserId": this.createTeamForm.controls.captainUserId.value
        }
        this.createTeamService.createTeam(teamDetails).subscribe(result => {
          this.teamCode = result.message;
          sessionStorage.setItem('teamCode', this.teamCode);
          this.show = false;
          this.showSpinner = false;
        },err =>{
          this.showSpinner = false;
          this.toast.error('Please Try again Later');
        })
      }
    }
  }

  chooseSport() {
    if (this.createTeamForm.controls.sports.value == "") {
      this._snackBar.open("Please Select Sport to Continue", "Ok", {
        duration: 5000,
        verticalPosition: "top",
      });
    }
    if (this.createTeamForm.controls.sports.value == "cricket") {
      this.cricket = true;
    }
  }

  teamPage() {
    this.players = [];
    this.show = true;
  }

  getPlayersIdField() {
    return this.formBuilder.group({
      playerId: ['', [RxwebValidators.unique(), Validators.required]]
    })
  }

  addPlayer() {
    let playerArray = <FormArray>this.createTeamForm.controls.playerIdArray;
    playerArray.push(this.getPlayersIdField());
    this.playerListSize++;
  }

  removePlayer() {
    let playerArray = <FormArray>this.createTeamForm.controls.playerIdArray;
    playerArray.removeAt(this.playerListSize - 1)
    this.playerListSize--;
  }

}
