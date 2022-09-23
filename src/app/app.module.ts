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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ServerHomeComponent,
    HomeComponent,
    UpdateServerComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NotifierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
