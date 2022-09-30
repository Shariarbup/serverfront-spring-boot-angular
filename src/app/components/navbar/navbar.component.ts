import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn = false;

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
  }
  logoutUser(){
    this.loginService.logout();
    location.reload();
  }
  

}
