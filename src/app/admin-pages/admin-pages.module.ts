import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {AdminSignupComponent} from './admin-signup/admin-signup.component';
import {GroupContactsComponent} from './group-contacts/group-contacts.component';
import {RegistrationMessageComponent} from './registration-message/registration-message.component';
import {GroupedContactsComponent} from './group-contacts/grouped-contacts/grouped-contacts.component';
import { BulkSmsComponent } from './messages/contact-message/bulk-sms.component';
import { GroupMessageComponent } from './messages/group-message/group-message.component';
import { ScheduledMessageComponent } from './messages/scheduled-message/scheduled-message.component';
import { SuperDashboardComponent } from './super-dashboard/super-dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatExpansionModule,
        AdminPagesRoutingModule
    ],
    declarations: [DashboardComponent,
        ContactListComponent,
        AdminSignupComponent,
        GroupContactsComponent,
        RegistrationMessageComponent,
        GroupedContactsComponent,
        BulkSmsComponent,
        GroupMessageComponent,
        ScheduledMessageComponent,
        SuperDashboardComponent,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ],

})
export class AdminPagesModule {
}
