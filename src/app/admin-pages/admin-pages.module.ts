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
import {MatIconModule} from "@angular/material/icon";
import {MatError, MatFormFieldModule} from "@angular/material/form-field";
import { ScheduledMessageModalComponent } from './messages/scheduled-message/scheduled-message-modal/scheduled-message-modal.component';
import { GroupedContactListComponent } from './group-contacts/grouped-contact-list/grouped-contact-list.component';
import { ImportContactComponent } from './contacts/import-contact/import-contact.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatButtonModule} from "@angular/material/button";
import { ImportGroupContactComponent } from './group-contacts/grouped-contact-list/import-group-contact/import-group-contact.component';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {MatSelectModule} from "@angular/material/select";
import { MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { UpdateGroupContactComponent } from './group-contacts/grouped-contact-list/update-group-contact/update-group-contact.component';
import {MatCardModule, MatCheckboxModule, MatSlideToggleModule} from "@angular/material";
import {PasswordResetComponentComponent} from "../auth-pages/password-reset-component/password-reset-component.component";
import { SmsPortsComponent } from './sms-ports/sms-ports.component';
import { AddSmsPortComponent } from './sms-ports/add-sms-port/add-sms-port.component';
import { SettingComponent } from './setting/setting.component';
import {ConfrimEqualValidatorDirective} from "../auth-pages/shared/confrim-equal-validator.directive";




@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmationPopoverModule,
        NgxPaginationModule,
        MatListModule,
        MatIconModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatButtonModule,
        // ConfirmationPopoverModule
        MatExpansionModule,
        MatCardModule,
        AdminPagesRoutingModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule
    ],
    declarations: [DashboardComponent,
        ContactListComponent,
        AdminSignupComponent,
        GroupContactsComponent,
        RegistrationMessageComponent,
        BulkSmsComponent,
        GroupMessageComponent,
        ScheduledMessageComponent,
        ScheduledMessageModalComponent,
        GroupedContactListComponent,
        ImportGroupContactComponent,
        SmsPortsComponent,
        AddSmsPortComponent,
        SettingComponent,

    ],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ],
})
export class AdminPagesModule {
}
