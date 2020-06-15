import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatExpansionModule } from '@angular/material/expansion';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CricketProfileComponent } from './profile/cricket-profile/cricket-profile.component';
import { EditProfileComponent } from './profile/cricket-profile/edit-profile/edit-profile.component';
import { StartMatchComponent } from './Match/start-match/start-match.component';
import { CreateteamComponent } from './Match/createteam/createteam.component';
import { ScoreCardComponent } from './Match/score-card/score-card.component';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { TeamsComponent } from './teams/teams.component';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingComponent } from './loading/loading.component';
import { MatSliderModule } from '@angular/material/slider';

export function socialConfigs() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('1009268874916-b6eqbj2tnurltdqnq1n67k67am6qjhu3.apps.googleusercontent.com')
    }
  ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    DashboardComponent,
    RegisterComponent,
    ProfileComponent,
    CricketProfileComponent,
    EditProfileComponent,
    StartMatchComponent,
    CreateteamComponent,
    ScoreCardComponent,
    TeamsComponent,
    ForgotPasswordComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right'
    }),
    RxReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    // AngularFontAwesomeModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatExpansionModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    MatSnackBarModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
