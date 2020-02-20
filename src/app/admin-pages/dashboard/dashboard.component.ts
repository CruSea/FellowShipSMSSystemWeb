import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js'
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../service/storage.service";
import {DashboardServiceService} from "../../service/dashboard-service/dashboard-service.service";
import {AddContactService} from "../../service/add-contact/add-contact.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public groupNames : string;
    datas: any[];

    jan:number;
    feb:number;
    mar:number;
    apr:number;
    jun:number;
    jul:number;
    aug:number;
    sep:number;
    nov:number;
    dec:number;


    loading: boolean;
    count: number;
    under_graduate_count: number;
    total_Groups: number;

    count_male: number;
    count_female: number;

    university: string;
    campus: string;

    total_sent_message_count: number;
    total_group_count: number;
    total_contact_count: number;
    today_successful_msg: number;
    total_msg_cost:number;
    total: number;
    dataa=[55, 56, 65, 28, 56, 65, 35, 43];

    per_page: number;
    page: number;

    title = 'char';
    chart = [];
    myPieChart = [];
    piechartData = [this.count_male, this.count_female];

    constructor(private contactService:AddContactService,
                private dashboardService: DashboardServiceService,
                private storageService: StorageService,) {
        this.page = 1
    }

    ngOnInit() {
        this.getUnderGradutesList();
        this.getTotalGroups();
        this.getGenderCount();
        this.pieChart();
        this.getCurrentUniv();
        this.getSentMessages();
        this.getGroupName();
        this.getDataByDate();
        this.getTotalMessageCost();
        this.lineChart();

        new Chart(document.getElementById("bar-chart-horizontal"), {
            type: 'horizontalBar',
            data: {
                labels: ["Male", "Female", "Total ", "Total sent Msg", "Total Receive Msg"],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                        data: [340,323,340,320,310,400]
                    }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Group Information Bar '
                }
            }
        });
    }

    lineChart(){
        let ctx = $("#line-chart");
        let line_chart = new Chart(ctx, {
            type: 'line',
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Combo Bar and line Chart'
                }, /*scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'month'
                        }
                    }]
                }*/
            },
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec'],
                datasets: [
                    {
                        type: 'line',
                        label: 'Sent Messages',
                        borderColor: 'rgba(135,206,250)',
                        data:this.dataa,
                        fill: false,
                    },
                    {
                        type: 'line',
                        label: 'Recieved Messages',
                        data: [24, 52, 36, 30, 45, 26, 30, 20,14,17,14,19],
                        backgroundColor: 'rgba(255,0,0)',
                        borderColor: 'rgba(255,20,147)',
                        fill: false,
                    }
                ]
            }
        });
    }

    pieChart() {
        this.myPieChart = new Chart('pie', {
            type: 'pie',

            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Total Male And Female Chart'
                }, legend: {
                    position: 'top',
                }, animation: {
                    animateScale: true,
                    animateRotate: true
                }
            },
            data: {
                datasets: [
                    {

                        data: this.piechartData,
                        backgroundColor: ['#21D8E7', '#E749AB']
                    }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: ['Male :' + this.count_male, 'Female :' + this.count_female,],
            }
        });
    }



    getGroupName() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.contactService.gets(headers, '/groups')
            .subscribe((res: any) => {
                this.groupNames = res.Groups;
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }


    getDataByDate() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.contactService.gets(headers, '/get_msg')
            .subscribe((res: any) => {
                this.jan = res[0];
                this.feb = res[1];
                this.mar = res[2];
                this.apr= res[3];
                this.jun= res[4];
                this.jul= res[3];
                this.aug= res[3];
                this.dataa=[this.jan, this.feb, this.mar, this.apr, 8, 15, 0, 18];
                this.lineChart();
                console.log(this.jan);
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
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

    getGenderCount() {
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
                this.piechartData = [this.count_male, this.count_female];
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

    getCurrentUniv() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/current_univ')
            .subscribe((res: any) => {
                this.university = res[0];
                this.campus = res[1];
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {

            })
    }

    getSentMessages() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/count_sentMessage')
            .subscribe((res: any) => {
                this.total_sent_message_count = res.messages;
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {

            })
    }

    getTotalMessageCost(){
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.dashboardService.gets(headers, '/messageCost')
            .subscribe((res: any) => {
                this.total_msg_cost = res.cost;
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {

            })
    }
}
