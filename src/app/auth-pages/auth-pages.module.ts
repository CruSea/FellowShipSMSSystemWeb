import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthPagesRoutingModule} from "./auth-pages-routing.module";

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AuthPagesRoutingModule,

  ],
  declarations: [LoginComponent]
})
export class AuthPagesModule { }
