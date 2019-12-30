import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPagesRoutingModule } from './auth-pages-routing.module';
import { LoginComponent } from './login/login.component';

import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    AuthPagesRoutingModule
  ],
  declarations: [LoginComponent,  RegistrationComponent]
})
export class AuthPagesModule { }
