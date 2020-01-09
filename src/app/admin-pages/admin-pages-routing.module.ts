import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContactListComponent} from "./contact-list/contact-list.component";
import {GroupContactsComponent} from "./group-contacts/group-contacts.component";
import {BulkSmsComponent} from "./messages/contact-message/bulk-sms.component";
import {GroupMessageComponent} from "./messages/group-message/group-message.component";
import {ScheduledMessageComponent} from "./messages/scheduled-message/scheduled-message.component";
import {SuperDashboardComponent} from "../super-admin-pages/super-dashboard/super-dashboard.component";
import {AdminsListComponent} from "../super-admin-pages/admins-list/admins-list.component";
import {RegisterAdminComponent} from "../super-admin-pages/register-admin/register-admin.component";
import {GroupedContactListComponent} from "./group-contacts/grouped-contact-list/grouped-contact-list.component";

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'contact-list', component: ContactListComponent},
    {path: 'group-contacts', component: GroupContactsComponent},
    {path: 'contact-message', component: BulkSmsComponent},
    {path: 'group-message', component: GroupMessageComponent},
    {path: 'scheduled-message',component:ScheduledMessageComponent},
    {path: 'super-dashboard', component:SuperDashboardComponent},
    {path: 'register', component:RegisterAdminComponent},
    {path: 'admins-list', component:AdminsListComponent},
    {path: 'grouped-contact', component:GroupedContactListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPagesRoutingModule {
}
