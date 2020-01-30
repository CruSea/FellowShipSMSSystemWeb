import {Component, OnInit} from '@angular/core';
import {DashboardServiceService} from "../../service/dashboard-service/dashboard-service.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../service/storage.service";

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/admin/dashboard', title: 'Dashboard', icon: '', class: ''},
    {path: '/admin/contact-list', title: 'Add Contact', icon: '', class: ''},
    {path: '/admin/group-contacts', title: 'Group Contact', icon: '', class: ''},
    {path: '/admin/contact-message', title: 'Messages', icon: '', class: ''},
    {path: '/admin/group-message', title: 'Group Message', icon: '', class: ''},
    {path: '/admin/scheduled-message', title: 'Scheduled Message', icon: '', class: ''},
    {path: '/admin/sms-survey', title: 'SMS Survey', icon: '', class: ''},
    {path: '/admin/register', title: 'Register Admin', icon: '', class: ''},
    {path: '/admin/super-dashboard', title:'Super Dashboard', icon:'', class:''},
    {path: '/admin/admins-list', title:'admins-list', icon:'', class:''}
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    user:any;

    constructor(private dashboardService: DashboardServiceService,
                private storageService: StorageService) {
    }


    ngOnInit() {
        this.getCurrentUser();
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

     getCurrentUser(){
         const headers = new HttpHeaders()
             .append('Access-Control-Allow-Origin', '*')
             .append('Access-Control-Allow-Methods', 'GET')
             .append('X-Requested-With', 'XMLHttpRequest')
             .append('Access-Control-Allow-Headers', 'Content-Type')
             .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
         return this.dashboardService.gets(headers, '/current_user')
             .subscribe((res: any) => {
                 this.user =res[0]+' '+res[1];
                 console.log(res);
             }, (httpErrorResponse: HttpErrorResponse) => {

             })
     }
}
