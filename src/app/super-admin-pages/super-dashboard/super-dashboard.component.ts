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

export class SuperDashboardComponent implements OnInit {
    count: number;
    total_bulk_count: number;
    total_group_count: number;
    total_group_message_count: number;
    today_successful_msg: number;
    total_Campus_contact: number;
    total_message_cost: number;
    total: number;
    data1 = [];
    data2 = [];

    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may:number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    nov: number;
    dec: number;

    jan1: number;
    feb1: number;
    mar1: number;
    apr1: number;
    may1:number;
    jun1: number;
    jul1: number;
    aug1: number;
    sep1: number;
    oct1: number;
    nov1: number;
    dec1: number;

    title = 'char';
    chart;
    chartdata = [13, 16, 5, 10, 12, 10, 16, 11, 19];

    constructor(private dashboardService: DashboardServiceService,
                private storageService: StorageService,) {

    }

    ngOnInit() {
        this.getTotalContact();
        this.getTotalMessage();
        this.getTotalGroup();
        this.getTotalGroupMessage();
        this.getTotalMessageCost();
        this.getRecieveMessage();
        this.getSentMessage();
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
                // this.chartdata =  [this.total_Campus_contact[0], 16, 5, 10,12, 10, 16,11,19];
                this.chartlist();
            }, (httpErrorResponse: HttpErrorResponse) => {
            });
    }


    chartlist() {

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
                labels: ['Jan', 'Feb', 'Mar', 'Apr','may', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Sent Messages ',
                        data: this.data2,
                        backgroundColor: 'rgba(0,0,255,0.4)',
                        borderColor: 'rgba(0,0,255,0.4)',
                        fill: true,
                    },
                    {
                        type: 'bar',
                        label: 'Recieved Messages',
                        data: this.data1,
                        backgroundColor: 'rgba(255, 182, 193)',
                        borderColor: 'rgba(255,20,147)',
                        fill: false,
                    }
                ]
            }
        });
    }

    getSentMessage() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/get_sentmsg')
            .subscribe((res: any) => {
                this.jan1 = res[0];
                this.feb1 = res[1];
                this.mar1 = res[2];
                this.apr1 = res[3];
                this.may1 = res[4]
                this.jun1 = res[5];
                this.jul1 = res[6];
                this.aug1 = res[7];
                this.sep1 = res[8];
                this.oct1 = res[9];
                this.nov1 = res[10];
                this.dec1 = res[11];
                this.data2 = [this.jan1,this.feb1, this.mar1, this.apr1,this.may1, this.jun1, this.jul1, this.aug1, this.sep1, this.oct1
                    , this.nov1, 10];
                this.chartlist();
                console.log(this.data2);
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    getRecieveMessage() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/get_recivemsgs')
            .subscribe((res: any) => {
                this.jan = res[0];
                this.feb = res[1];
                this.mar = res[2];
                this.apr = res[3];
                this.may =res[4];
                this.jun = res[5];
                this.jul = res[6];
                this.aug = res[7];
                this.data1 = [this.jan, this.feb, this.mar, this.apr,this.may, this.jun, this.jul, this.aug,9,12,11,10];
                this.chartlist();
              //  console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
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
