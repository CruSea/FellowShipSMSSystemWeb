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
//import {ToastrModule} from 'ngx-toastr';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        /*   ToastrModule.forRoot({
               timeOut : 2000
           }),*/
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatListModule,
        MatDialogModule,
        MatCardModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatExpansionModule
    ],
    declarations: [
        AppComponent,
        AdminPagesLayoutComponent,
        AuthPagesLayoutComponent,

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
