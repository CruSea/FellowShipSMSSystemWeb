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
    {path: '/admin/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''}, //dashboard
    {path: '/admin/contact-list', title: 'Add Contact', icon: 'contacts', class: ''}, //contacts
    {path: '/admin/group-contacts', title: 'Group Contact', icon: 'group', class: ''},//group
    {path: '/admin/contact-message', title: 'Messages', icon: 'sms', class: ''}, //sms
    {path: '/admin/group-message', title: 'Group Message', icon: 'mail_outline', class: ''}, //mail_outline
    {path: '/admin/bulk-message', title: 'Bulk Message', icon: 'message', class: ''}, //message
   // {path: '/admin/scheduled-message', title: 'Scheduled Message', icon: 'mail_outline', class: ''},//mail_outline
    {path: '/admin/sms-vote', title:'SMS Vote',icon:'', class:''},
    {path: '/admin/sms-port', title: 'Sms Port', icon: 'device_hub', class: ''},//device_hub

    {path: '/super-admin/register', title: 'Register Admin', icon: '', class: ''},
    {path: '/super-admin/super-dashboard', title:'Super Dashboard', icon:'', class:''},//dashboard
    {path: '/super-admin/admins-list', title:'admins-list', icon:'', class:''}//content_paste
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
