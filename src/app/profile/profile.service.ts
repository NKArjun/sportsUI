import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getProfile(uId):Observable<any>{
    return this.http.get<any>('https://sportsservice.azurewebsites.net/getProfile/'+uId);
  }
}
