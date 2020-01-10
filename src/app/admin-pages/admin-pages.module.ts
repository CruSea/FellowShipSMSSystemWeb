import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {AdminSignupComponent} from './admin-signup/admin-signup.component';
import {GroupContactsComponent} from './group-contacts/group-contacts.component';
import {RegistrationMessageComponent} from './registration-message/registration-message.component';
import {GroupedContactsComponent} from './group-contacts/grouped-contacts/grouped-contacts.component';
import { BulkSmsComponent } from './messages/contact-message/bulk-sms.component';
import { GroupMessageComponent } from './messages/group-message/group-message.component';
import { ScheduledMessageComponent } from './messages/scheduled-message/scheduled-message.component';
import { SuperDashboardComponent } from '../super-admin-pages/super-dashboard/super-dashboard.component';
import { AdminsListComponent } from '../super-admin-pages/admins-list/admins-list.component';
import {RegisterAdminComponent} from "../super-admin-pages/register-admin/register-admin.component";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ScheduledMessageModalComponent } from './messages/scheduled-message/scheduled-message-modal/scheduled-message-modal.component';
import { GroupedContactListComponent } from './group-contacts/grouped-contact-list/grouped-contact-list.component';
import { ImportContactComponent } from './contacts/import-contact/import-contact.component';
import { UpdateContactComponent } from './contacts/update-contact/update-contact.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
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
        AdminsListComponent,
        RegisterAdminComponent,
        ScheduledMessageModalComponent,
        GroupedContactListComponent,
        ImportContactComponent,
        UpdateContactComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ],

})
export class AdminPagesModule {
}
