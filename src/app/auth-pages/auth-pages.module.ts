import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthPagesRoutingModule} from "./auth-pages-routing.module";
import {
    MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SendEmailVerificationComponent } from './send-email-verification/send-email-verification.component';
import { PasswordResetComponentComponent } from './password-reset-component/password-reset-component.component';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatExpansionModule,
      AuthPagesRoutingModule,
      MatFormFieldModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule,
      MatInputModule,
      MatSelectModule,
      MatProgressSpinnerModule

  ],
  declarations: [LoginComponent, SendEmailVerificationComponent, PasswordResetComponentComponent],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ],
})
export class AuthPagesModule { }
