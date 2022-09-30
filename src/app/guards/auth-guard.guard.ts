import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private loginService:LoginService, private route: Router){}
  canActivate() {
    if(this.loginService.isLoggedIn()){
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
  
}
