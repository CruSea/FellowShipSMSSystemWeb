import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SendEmailVerificationComponent} from "./send-email-verification/send-email-verification.component";
import {PasswordResetComponentComponent} from "./password-reset-component/password-reset-component.component";

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'forgotten-password', component: SendEmailVerificationComponent},
    {path: 'reset', component: PasswordResetComponentComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthPagesRoutingModule {
}
