import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js'
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../service/storage.service";
import {DashboardServiceService} from "../../service/dashboard-service/dashboard-service.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    datas: any[];
    loading: boolean;
    count: number;
    under_graduate_count: number;
    total_Groups: number;

    count_male:number;
    count_female:number;

    total_bulk_count: number;
    total_group_count: number;
    total_contact_count: number;
    today_successful_msg: number;
    total: number;

    per_page: number;
    page: number;

    title = 'char';
    chart = [];
    myPieChart =[];
    piechartData = [this.count_male,this.count_female];

    constructor(private dashboardService: DashboardServiceService,
                private storageService: StorageService,) {
        this.page = 1
    }

    ngOnInit() {
        this.getUnderGradutesList();
        this.getTotalGroups();
        this.getGenderCount();
        this.pieChart();

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
                labels: ['Group 1', 'Group 2', 'Group 3', 'd', 'e', 'f', 'g', 'h'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Female',
                        data: [15, 156, 365, 30, 156, 265, 356, 543],
                        backgroundColor: 'rgba(255,0,255,0.4)',
                        borderColor: 'rgba(255,0,255,0.4)',
                        fill: false,
                    },
                    // {
                    //   type: 'line',
                    //   label: 'Dataset 2',
                    //   backgroundColor: 'rgba(0,0,255,0.4)',
                    //   borderColor: 'rgba(0,0,255,0.4)',
                    //   data: [
                    //     443, 256, 165, 100, 56, 65, 35, 543
                    //   ],
                    //   fill: true,
                    // },
                    {
                        type: 'bar',
                        label: 'Male',
                        data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
                        backgroundColor: 'rgba(0,0,255,0.4)',
                        borderColor: 'rgba(0,0,255,0.4)',
                        fill: false,
                    }
                ]
            }
        });



    }

    pieChart(){
        this.myPieChart = new Chart('pie', {
            type: 'pie',

            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Total Male And Female Chart'
                },legend:{
                    position:'top',
                },animation:{
                    animateScale:true,
                    animateRotate:true
                }
            },
            data: {
                datasets: [
                    {

                        data: this.piechartData,
                        backgroundColor:['#21D8E7' ,'#E749AB']
                    }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: ['Male :'+ this.count_male,'Female :'+this.count_female,],
            }
        });
    }

    getUnderGradutesList() {
        // this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.dashboardService.gets(headers, '/under_graduates_number')
            .subscribe((res: any) => {
                this.under_graduate_count = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    getGenderCount(){
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.dashboardService.gets(headers, '/gendercount')
            .subscribe((res: any) => {
            console.log(res);
                this.count_male = res.male;
                this.count_female = res.female;
                this.piechartData = [this.count_male,this.count_female];
                this.pieChart();

            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    getTotalGroups() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`)
            .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.dashboardService.gets(headers, '/totalGroups')
            .subscribe((res: any) => {
                this.total_Groups = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }
}
