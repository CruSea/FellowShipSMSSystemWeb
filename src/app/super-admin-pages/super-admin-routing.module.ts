import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SuperDashboardComponent} from "./super-dashboard/super-dashboard.component";
import {AdminsListComponent} from "./admins-list/admins-list.component";
import {RegisterAdminComponent} from "./register-admin/register-admin.component";

import {AuthGuard} from "../Auth/auth.guard";
import {PasswordResetComponentComponent} from "../auth-pages/password-reset-component/password-reset-component.component";

const routes: Routes = [

    {path: 'super-dashboard', component:SuperDashboardComponent},
    {path: 'register', component:RegisterAdminComponent},
    {path: 'admins-list', component:AdminsListComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuperAdminRoutingModule {
}
