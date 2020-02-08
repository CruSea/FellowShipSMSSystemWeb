import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterAdminComponent} from './register-admin/register-admin.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {
    MatButtonModule, MatCardModule,
    MatCheckboxModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatListModule,
    MatNativeDateModule,
    MatSelectModule, MatSlideToggleModule
} from "@angular/material";
import {SuperDashboardComponent} from "./super-dashboard/super-dashboard.component";
import {AdminsListComponent} from "./admins-list/admins-list.component";
import {ComponentsModule} from "../components/components.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {NgxPaginationModule} from "ngx-pagination";
import {SuperAdminRoutingModule} from "./super-admin-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AgmCoreModule} from "@agm/core";

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        HttpClientModule,
       // AgmCoreModule.forRoot(),
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
        MatCardModule,
        // ConfirmationPopoverModule
        SuperAdminRoutingModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        MatCheckboxModule
    ],
    declarations: [SuperDashboardComponent,
        AdminsListComponent,
        RegisterAdminComponent,
        AdminLoginComponent],

    exports: [
        FormsModule,
        ReactiveFormsModule
    ],
})
export class SuperAdminModule {
}
