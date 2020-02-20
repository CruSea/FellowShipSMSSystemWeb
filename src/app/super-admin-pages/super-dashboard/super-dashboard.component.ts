import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js'
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../service/storage.service";
import {DashboardServiceService} from "../../service/dashboard-service/dashboard-service.service";

@Component({
    selector: 'app-super-dashboard',
    templateUrl: './super-dashboard.component.html',
    styleUrls: ['./super-dashboard.component.scss']
})

export class SuperDashboardComponent implements OnInit{
    count: number;
    total_bulk_count: number;
    total_group_count: number;
    total_group_message_count: number;
    today_successful_msg: number;
    total_Campus_contact: number;
    total_message_cost:number;
    total: number;

    title = 'char';
    chart;
    chartdata =  [13, 16, 5, 10,12, 10, 16,11,19];

    constructor(private dashboardService: DashboardServiceService,
                private storageService: StorageService,) {

    }

    ngOnInit() {
        this.getTotalContact();
        this.getTotalMessage();
        this.getTotalGroup();
        this.getTotalGroupMessage();
        this.getTotalMessageCost();
        this.chartlist();
    }

    getTotalContact() {

        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/campusTotalContact')
            .subscribe((res: any) => {
                this.total_Campus_contact = res;
                 console.log(this.total_Campus_contact);
                this.chartdata =  [this.total_Campus_contact[0], 16, 5, 10,12, 10, 16,11,19];
                this.chartlist();
            }, (httpErrorResponse: HttpErrorResponse) => {
            });
    }



    chartlist(){

        this.chart = new Chart('bar', {
            type: 'bar',
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Combo Bar and line Chart'
                },
            },
            data: {
                labels: ['Campus A', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Total Contact List ',
                        data: this.chartdata,
                        backgroundColor: 'rgba(0,0,255,0.4)',
                        borderColor: 'rgba(0,0,255,0.4)',
                        fill: true,
                    },
                    {
                        type: 'bar',
                        label: 'Recieved Messages',
                        data: [24, 52, 36, 30, 45, 26, 30, 20,14,17,14,19],
                        backgroundColor: 'rgba(255, 182, 193)',
                        borderColor: 'rgba(255,20,147)',
                        fill: false,
                    }
                ]
            }
        });
    }


    getTotalGroup() {

        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/TotalnumberOfGroups')
            .subscribe((res: any) => {
                this.total_group_count = res.count;
               /* this.chartdata =  [this.total_Campus_contact[0], 16, 5, 10,12, 10, 16,11,19];
                this.chartlist();*/
            }, (httpErrorResponse: HttpErrorResponse) => {
            });
    }


    getTotalMessage() {

        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/total_sentMessage')
            .subscribe((res: any) => {
                this.total_bulk_count = res.messages;
              /*  console.log(this.total_Campus_contact);
                this.chartdata =  [this.total_Campus_contact[0], 16, 5, 10,12, 10, 16,11,19];
                this.chartlist();*/
            }, (httpErrorResponse: HttpErrorResponse) => {
            });
    }


    getTotalGroupMessage() {

        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/all_group_message')
            .subscribe((res: any) => {
                this.total_group_message_count = res;
                /* this.chartdata =  [this.total_Campus_contact[0], 16, 5, 10,12, 10, 16,11,19];
                 this.chartlist();*/
            }, (httpErrorResponse: HttpErrorResponse) => {
            });
    }

    getTotalMessageCost() {

        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/totalMessageCost')
            .subscribe((res: any) => {
                this.total_message_cost = res.cost;
                /* this.chartdata =  [this.total_Campus_contact[0], 16, 5, 10,12, 10, 16,11,19];
                 this.chartlist();*/
            }, (httpErrorResponse: HttpErrorResponse) => {
            });
    }
}
