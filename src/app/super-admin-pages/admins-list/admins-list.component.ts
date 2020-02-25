import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {StorageService} from "../../service/storage.service";
import {RegisterService} from "../../service/register/register.service";
import index from "@angular/cdk/typings/schematics/ng-generate/drag-drop";

declare let $: any;

@Component({
    selector: 'app-admins-list',
    templateUrl: './admins-list.component.html',
    styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent implements OnInit {


    animal: string;
    firstname: string;
    loading: boolean;

    current_page: string;
    _form: string;
    per_page: number;
    total: number;
    page: number;

    checked = false;
    idd: string;

    changed(id: string) {
        //  this.assignRole(this.checked,id);
        console.log(this.checked, id)
        this.idd = id;
    }

    displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'university', 'campus', 'phone_number'];
    dataSource: any;

    ispopupOpened = false;
    public email: any;

    constructor(private storageService: StorageService,
                private registservice: RegisterService) {
        this.page = 1;
    }

    ngOnInit() {
        this.collectionOfcon(this.page);
    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfcon(e) {
        this.loading = true;
        if (e) {
            this.page = e;
        }
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.registservice.gets(headers, '/getAdmin')
            .subscribe((res: any) => {
                this.loading = false;
                console.log(res);
                this.dataSource = res.contacts;
                // this.per_page = res.contacts.per_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    assignRole(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // console.log(this.storageService.getStorage('accessToken'));
        //  .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.registservice.create(null, headers, '/assignRole/' + this.checked + '/' + id)
            .subscribe((res: { message: string }) => {
                console.log('Role assigned successfully!!!!!');
                this.showNotificationn('top', 'right')
            }, (httpErrorResponse: HttpErrorResponse) => {
                //this.toastr.error(httpErrorResponse.error.error, 'Error', {timeOut: 10000});
                console.log(httpErrorResponse);
            })
    }

    deleteContact(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.registservice.delete(`deleteAdmin/${id}`, headers)
            .subscribe((res: { message: string }) => {
                console.log('Admin Deleted Successfully!!!!!!!!');
                this.showNotification2('top', 'right')
                this.collectionOfcon(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                //   this.toastr.error('Ooops! something went wrong, contact is not deleted', 'Error', {timeOut: 3000});
            })
    }


    tcode: string;

    submit(event: any) {
        // this.serverName = event.target.value;
        console.log(this.tcode);
        this.SendMail(this.tcode);
    }


    SendMail(email: string) {
        // console.log(email);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.registservice.gets(headers, '/sendmail/' + this.tcode)
            .subscribe((res: any) => {
                console.log(res);
                this.showNotification('top', 'right');
            }, (httpErrorResponse: HttpErrorResponse) => {

            })
    }

    showNotification(from, align) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: "Email<b>  Sent Successfully !!.</b>"

        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }

    showNotificationn(from, align) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: "Role<b>  Assigned Successfully !!.</b>"

        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }

    showNotification2(from, align) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: "Contact<b>  deleted Successfully !!.</b>"

        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }

}
