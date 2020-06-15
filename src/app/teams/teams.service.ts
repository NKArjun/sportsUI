import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http:HttpClient) { }

  getTeams():Observable<any>{
    return this.http.get<any>("https://sportsservice.azurewebsites.net/getTeams");
  }

  joinTeam(userId,captainId,teamCode):Observable<any>{
    return this.http.get<any>("https://sportsservice.azurewebsites.net/joinTeam/"+userId+"/"+captainId+"/"+teamCode);
  }

  acceptPlayer(notification):Observable<any>{
    return this.http.put<any>("https://sportsservice.azurewebsites.net/acceptPlayer",notification);
  }

  getUser(userId):Observable<any>{
    return this.http.get<any>("https://sportsservice.azurewebsites.net/getUser/"+userId);
  }
  
}
