import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContactListComponent} from "./contact-list/contact-list.component";

const routes: Routes = [
  { path: '',      component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contact-list', component: ContactListComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
