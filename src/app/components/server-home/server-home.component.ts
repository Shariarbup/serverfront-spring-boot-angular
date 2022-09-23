import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/data-state.enum';
import { Status } from 'src/app/enum/Status.enum';
import { AppState } from 'src/app/interface/app-state';
import { CustomResponse } from 'src/app/interface/custom-response';
import { IReport } from 'src/app/interface/IReport';
import { Server } from 'src/app/interface/server';
import { NotificationService } from 'src/app/service/notification.service';
import { ServerService } from 'src/app/service/server.service';

declare var window:any;

@Component({
  selector: 'app-server-home',
  templateUrl: './server-home.component.html',
  styleUrls: ['./server-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerHomeComponent implements OnInit {
  public reports:Array<IReport>=[
    {id:1, name:"pdf"},
    {id:2, name:"html"},
    {id:3, name:"csv"}
  ];
  public reportId:number=0;
  public reportFormatname:string="";
  formModal: any;
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  readonly Status = Status;
  private filterSubject = new BehaviorSubject<String>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  filterStatus$ = this.filterSubject.asObservable();

  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.filterSubject.asObservable();

  constructor(private serverService: ServerService, private notifier: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("addServerModal")
    );
    this.appState$ = this.serverService.servers$
    .pipe(
      map(response=>{
        this.notifier.onDefault(response.message);
        this.dataSubject.next(response);
        return {
          dataState: DataState.LOADED_STATE,
          appData: {...response, data: {servers: response.data.servers.reverse()}}
        }
      }),
      startWith({  
        dataState: DataState.LOADING_STATE
      }),
      catchError((error: string)=>{
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error: error});
      })
    );
  }

  openPopup() {
    this.formModal.show();
  }
  closePopup() {
    this.formModal.hide();
  }

  pingServer(ipAddress: string): void {
    this.filterSubject.next(ipAddress); 
    this.appState$ = this.serverService.pingServer$(ipAddress)
    .pipe(
      map(response=>{
        const index =  this.dataSubject.value.data.servers.findIndex(server => server.id === response.data.server.id);
        this.dataSubject.value.data.servers[index] = response.data.server;
        this.notifier.onDefault(response.message);
        this.filterSubject.next('');
        return {
          dataState: DataState.LOADED_STATE,
          appData: this.dataSubject.value
        }
      }),
      startWith({  
        dataState: DataState.LOADED_STATE ,
        appData: this.dataSubject.value
      }),
      catchError((error: string)=>{
        this.filterSubject.next('');
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error: error});
      })
    );
  }


  
saveServer(serverForm: NgForm): void {
  this.isLoading.next(true);
    this.appState$ = this.serverService.saveServer$(serverForm.value as Server)
    .pipe(
      map(response=>{
        this.dataSubject.next(
          {...response, data: {servers: [response.data.server, ...this.dataSubject.value.data.servers]}}
        );
        this.notifier.onDefault(response.message);
        document.getElementById('closeModal').click();
        this.isLoading.next(false);
        serverForm.resetForm({Status: this.Status.SERVER_DOWN});
        return {
          dataState: DataState.LOADED_STATE,
          appData: this.dataSubject.value
        }
      }),
      startWith({  
        dataState: DataState.LOADED_STATE ,
        appData: this.dataSubject.value
      }),
      catchError((error: string)=>{
        this.isLoading.next(false);
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error});
      })
    );
  }


 filterServers(status: Status): void {
    this.appState$ = this.serverService.filterServer$(status, this.dataSubject.value)
    .pipe(
      map(response=>{
        this.notifier.onDefault(response.message);
        return {
          dataState: DataState.LOADED_STATE,
          appData: response
        }
      }),
      startWith({  
        dataState: DataState.LOADED_STATE ,
        appData: this.dataSubject.value
      }),
      catchError((error: string)=>{
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error: error});
      })
    );
  }


  deleteServer(server: Server): void {
    this.appState$ = this.serverService.deleteServer$(server.id)
    .pipe(
      map(response=>{
        this.dataSubject.next(
          {...response, 
            data: {servers: this.dataSubject.value.data.servers.filter(s => s.id !== server.id)}}
        );
        this.notifier.onDefault(response.message);
        return {
          dataState: DataState.LOADED_STATE,
          appData: this.dataSubject.value
        }
      }),
      startWith({  
        dataState: DataState.LOADED_STATE ,
        appData: this.dataSubject.value
      }),
      catchError((error: string)=>{
        return of({ dataState: DataState.ERROR_STATE, error: error});
      })
    );
  }

  printReportOfServer(): void {
    this.notifier.onInfo('Report Downloaded');
    let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
    let tableSelect = document.getElementById('servers');
    let tableHtml = tableSelect.outerHTML.replace(/ /g, '%20');
    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ', ' + tableHtml;
    downloadLink.download = 'server-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);


  }
  printReportOfServerAsPdf(): void {
   window.print();
  }

  createReport(){

    return this.serverService.createReport$(this.reportFormatname).subscribe(
      (response)=>{
      this.notifier.onInfo(response.message);
      // alert("File Path: "+response);
      console.log(response);
      
    },
      (error)=>{console.log(error);
      }
    );
   }
   updateServer(id:number){
    this.router.navigate(['update-server', id]);
   }

}
