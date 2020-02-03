import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {AdminPagesLayoutComponent} from './layouts/admin-pages-layout/admin-pages-layout.component';
import {AuthPagesLayoutComponent} from './layouts/auth-pages-layout/auth-pages-layout.component';
import {AuthGuard} from "./Auth/auth.guard";
import {PublicGuard} from "ngx-auth";
import {SuperAdminModule} from "./super-admin-pages/super-admin.module";
import {SuperAdminPagesLayoutComponent} from "./layouts/super-admin-pages-layout/super-admin-pages-layout.component";

const routes: Routes = [
    {
        path: 'login',
        redirectTo: 'auth/login',
       // pathMatch: 'full',
    },
    {
        path: 'forgotten-password',
        redirectTo: 'auth/forgotten-password',
        // pathMatch: 'full',
    },
    {
        path: '',
        redirectTo: 'auth/sign-up',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminPagesLayoutComponent,
        canActivate: [ AuthGuard ],
        data:{
    allowedRoles: ['ADMIN']},
        children: [
            {
                path: 'admin',
                loadChildren: './admin-pages/admin-pages.module#AdminPagesModule'
            }]
    },
    {
        path: '',
        component: SuperAdminPagesLayoutComponent,
      //  canActivate: [ AuthGuard ],
        children: [
            {
                path: 'super-admin',
                loadChildren: './super-admin-pages/super-admin.module#SuperAdminModule'
            }]
    },
    {
        path: '',
        component: AuthPagesLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './auth-pages/auth-pages.module#AuthPagesModule'
            }]
    },
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
