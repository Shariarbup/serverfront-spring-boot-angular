import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServerHomeComponent } from './components/server-home/server-home.component';
import { UpdateServerComponent } from './components/update-server/update-server.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'server-home',component: ServerHomeComponent},
  {path:'update-server/:id', component:UpdateServerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
