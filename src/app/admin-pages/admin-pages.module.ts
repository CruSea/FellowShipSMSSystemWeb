import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    AdminPagesRoutingModule
  ],
  declarations: [DashboardComponent,
   ],
//  providers: [ContactsService, GroupContactsService, ContactMessageService, GroupMessageService],
 // entryComponents:[AddContactComponent, AddGroupsComponent, AddContactMessageComponent, AddGroupMessageComponent],
})
export class AdminPagesModule { }
