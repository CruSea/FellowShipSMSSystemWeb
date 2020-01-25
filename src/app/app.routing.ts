import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {AdminPagesLayoutComponent} from './layouts/admin-pages-layout/admin-pages-layout.component';
import {AuthPagesLayoutComponent} from './layouts/auth-pages-layout/auth-pages-layout.component';
import {AuthGuard} from "./Auth/auth.guard";
import {PublicGuard} from "ngx-auth";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',

        pathMatch: 'full',
    },
    {
        path: '',
        redirectTo: 'auth/sign-up',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminPagesLayoutComponent,
        children: [
            {
                path: 'admin',
                loadChildren: './admin-pages/admin-pages.module#AdminPagesModule'
            }]
    }, {
        path: '',
        component: AuthPagesLayoutComponent,
       // canActivate: [ PublicGuard ],
        children: [
            {
                path: 'auth',
                loadChildren: './auth-pages/auth-pages.module#AuthPagesModule'
            }]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'auth/login', }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
