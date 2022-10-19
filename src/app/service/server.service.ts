import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Status } from '../enum/Status.enum';
import { CustomResponse } from '../interface/custom-response';
import { Server } from '../interface/server';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  private readonly apiUrl = 'http://localhost:8082/api/v1/servers';

  constructor(private http: HttpClient,private loginService:LoginService) { }
 header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${this.loginService.getToken()}`).set('Content-Type', 'application/json')
  }
  servers$ = <Observable<CustomResponse>> this.http.get<CustomResponse>(`${this.apiUrl}/`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  )
  
  saveServer$ = (server: any)=><Observable<CustomResponse>> this.http.post<CustomResponse>(`${this.apiUrl}/`,server,this.header)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  )
  
  pingServer$ = (ipAddress: string)=><Observable<CustomResponse>> this.http.get<CustomResponse>(`${this.apiUrl}/ping/${ipAddress}`,this.header)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  )
  
  filterServer$ = (status: Status, response: CustomResponse)=><Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber=>{
        console.log(response);
        subscriber.next(
          status === Status.ALL ? {...response, message: `Server filtered by ${status} status`}:
          {
            ...response, 
            message: response.data.servers.filter(server=> server.status === status).length > 0 ? 
            `Server filtered by ${status === Status.SERVER_UP ? 'SERVER_UP' : 'SERVER_DOWN'} status` :
            `No server ${status} found` ,
            data: { servers : response.data.servers
            .filter(server=> server.status === status)}        
          }
        );
        subscriber.complete();
      }
    )
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  )


  deleteServer$ = (serverId: number)=><Observable<CustomResponse>> this.http.delete<CustomResponse>(`${this.apiUrl}/${serverId}`,this.header)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  )

  createReport$(reportFormatname:string):Observable<any>{
    
    this.servers$.subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
        
      }
    )
    return this.http.get(`${this.apiUrl}/report/${reportFormatname}`,this.header);
  }

  updateServer$(id:number, server:Server):Observable<Object>{
    console.log("This is from service: ",id, server)
    return this.http.put(`${this.apiUrl}/${id}`,server,this.header);
  }
  getServerById(id:number):Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`${this.apiUrl}/${id}`,this.header);
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError (`An error occured - Error code: ${error.status}`);
  }

}
