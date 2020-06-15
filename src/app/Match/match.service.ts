import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http:HttpClient) { }
  getPlayers():Observable<any>{
    return this.http.get<any>("https://sportsservice.azurewebsites.net/getPlayersDetails");
  }

  createTeam(form):Observable<any>{
    return this.http.post<any>("https://sportsservice.azurewebsites.net/createTeam",form);
  }

  getTeam(teamCode):Observable<any>{
    return this.http.get<any>("https://sportsservice.azurewebsites.net/getTeam/"+teamCode)
  }

  getTeams():Observable<any>{
    return this.http.get<any>("https://sportsservice.azurewebsites.net/getTeams");
  }
}
