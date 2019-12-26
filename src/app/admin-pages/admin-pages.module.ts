import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {ContactListComponent} from "./contact-list/contact-list.component";
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { GroupContactsComponent } from './group-contacts/group-contacts.component';
import { MessagesComponent } from './messages/messages.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationMessageComponent } from './registration-message/registration-message.component';
import {ContactsService} from "./add-contact/contacts.service";
import {AddContactComponent} from "./add-contact/add-contact.component";

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
       MessagesComponent,
       RegisterComponent,
       RegistrationMessageComponent
   ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],


})
export class AdminPagesModule { }
