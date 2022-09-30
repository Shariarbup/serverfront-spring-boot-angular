import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
baseUrl = "http://localhost:8080/api/v1/auth/login";
httOptions = {
  headers: new HttpHeaders().set( 'Content-Type', 'application/json')
}
  constructor(private http:HttpClient) { }
  //calling the server to generate token
  generateToken(username:string, password:string){
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    console.log(body);
    
    return this.http.post(this.baseUrl, {username, password},options);
  }
  //for login user
  loginUSer(token:string, username:string){
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      return true;
  }
  //to checked user is logged in or not
  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token === undefined || token === '' || token === null){
      return false;
    }else{
      return true;
    }
  }
  //for logged out the user
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
  //get token
  getToken(){
    return localStorage.getItem('token');
  }
 
}
