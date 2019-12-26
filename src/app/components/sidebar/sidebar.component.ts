import {Component, OnInit} from '@angular/core';

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
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
