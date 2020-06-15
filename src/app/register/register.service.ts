import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  register(form):Observable<any>{
    return this.http.post<any>("https://sportsservice.azurewebsites.net/register",form);
  }
}
