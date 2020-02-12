import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {GroupContactsComponent} from "./group-contacts/group-contacts.component";
import {ContactSmsComponent} from "./messages/contact-message/contact-sms.component";
import {GroupMessageComponent} from "./messages/group-message/group-message.component";
import {ScheduledMessageComponent} from "./messages/scheduled-message/scheduled-message.component";
import {SuperDashboardComponent} from "../super-admin-pages/super-dashboard/super-dashboard.component";
import {AdminsListComponent} from "../super-admin-pages/admins-list/admins-list.component";
import {RegisterAdminComponent} from "../super-admin-pages/register-admin/register-admin.component";
import {GroupedContactListComponent} from "./group-contacts/grouped-contact-list/grouped-contact-list.component";
import {AuthGuard} from "../Auth/auth.guard";
import {PasswordResetComponentComponent} from "../auth-pages/password-reset-component/password-reset-component.component";
import {SmsPortsComponent} from "./sms-ports/sms-ports.component";
import {SettingComponent} from "./setting/setting.component";
import {BulkMessageListComponent} from "./messages/bulk-message-list/bulk-message-list.component";

const routes: Routes = [
    {path: '', component: DashboardComponent,canActivate: [ AuthGuard ]},
    {path: 'dashboard', component: DashboardComponent,canActivate: [ AuthGuard ]},
    {path: 'contact-list', component: ContactListComponent},
    {path: 'group-contacts', component: GroupContactsComponent},
    {path: 'contact-message', component: ContactSmsComponent},
    {path: 'group-message', component: GroupMessageComponent},
    {path: 'bulk-message', component:BulkMessageListComponent},
    {path: 'scheduled-message',component:ScheduledMessageComponent},
    {path: 'sms-port',component:SmsPortsComponent},
    {path: 'settings',component:SettingComponent},
    /*{path: 'register', component:RegisterAdminComponent},
    {path: 'admins-list', component:AdminsListComponent},*/
    {path: 'grouped-contact/:id',
        component:GroupedContactListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPagesRoutingModule {
}
