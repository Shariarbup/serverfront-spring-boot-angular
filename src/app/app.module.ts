import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServerHomeComponent } from './components/server-home/server-home.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms'
import { NotificationModule } from './notification/notification.module';
import { NotifierModule } from 'angular-notifier';
import { UpdateServerComponent } from './components/update-server/update-server.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginService } from './service/login.service';
import { ServerService } from './service/server.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ServerHomeComponent,
    HomeComponent,
    UpdateServerComponent,
    LoginComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NotifierModule
  ],
  providers: [AuthGuardGuard,LoginService,ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
