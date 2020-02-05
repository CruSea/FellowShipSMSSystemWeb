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

    university:string;
    campus:string;

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
        this.getCurrentUniv();

        let ctx = $("#line-chart");
        let line_chart = new Chart(ctx, {
            type: 'line',
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Combo Bar and line Chart'
                },
            },
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug'],
                datasets: [
                     {
                       type: 'line',
                       label: 'Dataset 1',
                       borderColor: 'rgba(135,206,250)',
                       data: [
                         43, 56, 65, 28, 56, 65, 35, 43
                       ],
                       fill: false,
                     },
                    {
                        type: 'line',
                        label: 'Dataset 2',
                        data: [24, 52, 36, 30, 45, 26, 30, 20],
                        backgroundColor: 'rgba(255,0,0)',
                        borderColor: 'rgba(255,20,147)',
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

    getCurrentUniv(){
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/current_univ')
            .subscribe((res: any) => {
                this.university =res[0];
                this.campus=res[1];
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {

            })
    }
}
