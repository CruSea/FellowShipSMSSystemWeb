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
    total_contact_count: number;
    today_successful_msg: number;
    total_Campus_contact: number;
    total: number;

    title = 'char';
    chart;
    chartdata =  [13, 16, 5, 10,12, 10, 16,11,19];

    constructor(private dashboardService: DashboardServiceService,
                private storageService: StorageService,) {

    }

    ngOnInit() {
        this.getTotalContact();
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
                        type: 'line',
                        label: 'Total Contact List ',
                        data: this.chartdata,
                        backgroundColor: 'rgba(0,0,255,0.4)',
                        borderColor: 'rgba(0,0,255,0.4)',
                        fill: true,
                    },
                ]
            }
        });
    }
}
