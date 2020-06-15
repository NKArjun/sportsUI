import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CricketProfileService {

  constructor(private http:HttpClient) { }

  getPlayerProfile(uId):Observable<any>{
    return this.http.get('https://sportsservice.azurewebsites.net/getProfile/'+uId);
  }
}
