import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {MatCheckboxModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  declarations: [RegisterAdminComponent, AdminLoginComponent]
})
export class SuperAdminModule { }
