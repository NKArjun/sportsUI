import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate {

  constructor(private router:Router) { }

  canActivate(){
    let user = sessionStorage.getItem('userId');
    if(user!=null) return true;
    else {
      this.router.navigate(['/login']);
    };
  }
}
