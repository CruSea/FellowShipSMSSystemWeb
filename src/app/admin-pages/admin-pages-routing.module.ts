import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContactListComponent} from "./contact-list/contact-list.component";
import {GroupContactsComponent} from "./group-contacts/group-contacts.component";
import {BulkSmsComponent} from "./messages/contact-message/bulk-sms.component";
import {GroupMessageComponent} from "./messages/group-message/group-message.component";
import {ScheduledMessageComponent} from "./messages/scheduled-message/scheduled-message.component";

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'contact-list', component: ContactListComponent},
    {path: 'group-contacts', component: GroupContactsComponent},
    {path: 'contact-message', component: BulkSmsComponent},
    {path: 'group-message', component: GroupMessageComponent},
    {path: 'scheduled-message',component:ScheduledMessageComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPagesRoutingModule {
}
