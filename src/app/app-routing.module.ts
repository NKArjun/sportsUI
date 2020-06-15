import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { StartMatchComponent } from './Match/start-match/start-match.component';
import { CreateteamComponent } from './Match/createteam/createteam.component';
import { ScoreCardComponent } from './Match/score-card/score-card.component';
import { EditProfileComponent } from './profile/cricket-profile/edit-profile/edit-profile.component';
import { TeamsComponent } from './teams/teams.component';
import { CricketProfileComponent } from './profile/cricket-profile/cricket-profile.component';
import { AccessGuardService } from './access-guard.service';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AccessGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent,canActivate:[AccessGuardService] },
  { path: 'cricket-profile/:uId/:userName', component: CricketProfileComponent,canActivate:[AccessGuardService] },
  { path: 'start-match', component: StartMatchComponent,canActivate:[AccessGuardService] },
  { path: 'create-team', component: CreateteamComponent,canActivate:[AccessGuardService] },
  { path: 'score-card', component: ScoreCardComponent,canActivate:[AccessGuardService] },
  { path: 'cricket-profile', 
  children:[
    {
    path:'edit-profile',
    component:EditProfileComponent
    }
  ],
  component: EditProfileComponent,canActivate:[AccessGuardService] },
  { path: "search-team", component: TeamsComponent,canActivate:[AccessGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
