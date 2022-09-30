import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ServerHomeComponent } from './components/server-home/server-home.component';
import { UpdateServerComponent } from './components/update-server/update-server.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'home',component: HomeComponent, canActivate:[AuthGuardGuard]},
  {path: 'server-home',component: ServerHomeComponent,canActivate:[AuthGuardGuard]},
  {path:'update-server/:id', component:UpdateServerComponent,canActivate:[AuthGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
