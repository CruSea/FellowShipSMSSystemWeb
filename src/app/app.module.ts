import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminPagesLayoutComponent} from './layouts/admin-pages-layout/admin-pages-layout.component';
import {AuthPagesLayoutComponent} from './layouts/auth-pages-layout/auth-pages-layout.component';
import { MatDialogModule, MatCardModule, MatExpansionPanel } from '@angular/material';
import {MatListModule} from '@angular/material';

import {MatExpansionModule} from '@angular/material/expansion';
import {AddContactComponent} from "app/admin-pages/contacts/add-contact/add-contact.component";
import {ContactsService} from "./admin-pages/contacts/add-contact/contacts.service";
import {GroupContactsService} from "./admin-pages/group-contacts/add-group/group-contact.service";
import {AddGroupComponent} from "./admin-pages/group-contacts/add-group/add-group.component";
import {ContactMessageService} from "./admin-pages/messages/contact-message/add-contact-message/contact-message.service";
import {AddContactMessageComponent} from "./admin-pages/messages/contact-message/add-contact-message/add-contact-message.component";
import {GroupMessageService} from "./admin-pages/messages/group-message/add-group-message/GroupMessage.service";
import {AddGroupMessageComponent} from "./admin-pages/messages/group-message/add-group-message/add-group-message.component";
import {AddContactService} from "./service/add-contact/add-contact.service";
import {MatIconModule} from "@angular/material/icon";
import {NgxPaginationModule} from "ngx-pagination";
//import {ToastrModule} from 'ngx-toastr';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        /*   ToastrModule.forRoot({
               timeOut : 2000
           }),*/
        FormsModule,
        NgxPaginationModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatListModule,
        MatDialogModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatExpansionModule
    ],
    declarations: [
        AppComponent,
        AdminPagesLayoutComponent,
        AuthPagesLayoutComponent,
        AddGroupComponent,
        AddContactComponent,
        AddContactMessageComponent,
        AddGroupMessageComponent
    ],
    entryComponents: [AddContactComponent, AddGroupComponent,AddContactMessageComponent,AddGroupMessageComponent],
    providers: [ContactsService, GroupContactsService,ContactMessageService,GroupMessageService,AddContactService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
