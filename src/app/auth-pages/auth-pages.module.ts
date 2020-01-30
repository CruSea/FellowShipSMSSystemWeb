import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthPagesRoutingModule} from "./auth-pages-routing.module";
import {
    MatButtonModule, MatCardModule, MatFormFieldControl, MatFormFieldModule,
    MatIconModule, MatInputModule, MatProgressSpinnerModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SendEmailVerificationComponent } from './send-email-verification/send-email-verification.component';
import { PasswordResetComponentComponent } from './password-reset-component/password-reset-component.component';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AuthPagesRoutingModule,
      MatFormFieldModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      MatProgressSpinnerModule

  ],
  declarations: [LoginComponent, SendEmailVerificationComponent, PasswordResetComponentComponent]
})
export class AuthPagesModule { }
