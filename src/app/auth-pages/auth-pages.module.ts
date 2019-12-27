import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPagesRoutingModule } from './auth-pages-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AuthPagesRoutingModule,
      FormsModule
  ],
  declarations: [LoginComponent]
})
export class AuthPagesModule { }
