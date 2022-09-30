import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username : '',
    password : ''
  }

  constructor(private loginservice:LoginService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if((this.credentials.username != '' && this.credentials.password !='') && (this.credentials.username != null && this.credentials.password != null)){
      console.log("We have to submit the form to server");
      console.log(this.credentials.username);
      this.loginservice.generateToken(this.credentials.username, this.credentials.password).subscribe(
        (response:any)=>{
          console.log(response);
          this.loginservice.loginUSer(response.token, response.username);
          this.route.navigate(['server-home']);
        },
        error=>{
          console.log(error);
        }
      )
    }else{
      console.log("Fields are empty");
    }
  }

}
