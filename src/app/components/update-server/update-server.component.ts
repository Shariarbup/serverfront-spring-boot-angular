import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { ServerService } from 'src/app/service/server.service';
import { Server } from "../../interface/server";
import { Serverp } from "../../class/serverp";
import { CustomResponse } from "../../interface/custom-response";
@Component({
  selector: 'app-update-server',
  templateUrl: './update-server.component.html',
  styleUrls: ['./update-server.component.css']
})
export class UpdateServerComponent implements OnInit {
  id:number=0;
  server: Server;
  customResponse: CustomResponse;
 
  constructor(private serverService: ServerService, private notifier: NotificationService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.serverService.getServerById(this.id).subscribe(
      response=>{
        this.customResponse = response;
        console.log(response);
        // this.serverp=response.data.server;
       },
       error=>{
         console.log(error);
         
       }
       
     );

   }

   onSubmit(){
    this.server = this.customResponse.data.server;
    this.id = this.server.id;
    console.log(this.id);
    console.log("this is from onsubmit: ",this.server);
    this.serverService.updateServer$(this.id, this.server).subscribe(
      data=>{ this.goToServerList()},
      error=>{console.log(error);
      }
    )
  }
  goToServerList(){
    this.router.navigate(['/server-home']);
  }

  }


