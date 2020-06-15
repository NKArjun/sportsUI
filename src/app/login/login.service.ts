import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url = "https://sportsservice.azurewebsites.net/login"
  constructor(private http: HttpClient) { }

  checkLogin(form):Observable<any>{
    let userEmail = form.email.value;
    let password = form.password.value;
    return this.http.get<any>(this.url,{params:{userEmail,password}});
  }
  
  changePassword(userId,password):Observable<any>{
    return this.http.get("https://sportsservice.azurewebsites.net/changePassword",{params:{userId,password}});
  }

  checkPhoneNo(phoneNo):Observable<any>{
    return this.http.get("https://sportsservice.azurewebsites.net/checkPhoneNo",{params:{phoneNo}});
  }
}
