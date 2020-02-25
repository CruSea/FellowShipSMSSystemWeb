import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {SettingService} from "../../service/setting/setting.service";
import {StorageService} from "../../service/storage.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AddSettingComponent} from "./add-setting/add-setting.component";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

    animal: string;
    firstname: string;
    loading: boolean;

    current_page: string;
    _form: string;
    per_page: number;
    total: number;
    page: number;

    public dataSource:any;
    ispopupOpened = false;

    constructor(private matDialog: MatDialog,
                private storageService: StorageService,
                private settingService: SettingService,
                private dialog?: MatDialog,) {
        this.page = 1;
    }

    add_setting() {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(AddSettingComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.ispopupOpened = false;
        })
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
        return this.settingService.gets(headers, '/settings/?page=' + this.page)
            .subscribe((res: any) => {
                console.log(res);
                this.loading = false;
                this.dataSource = res.settings;
               // this.total = res.sms_ports.total;
                //this.per_page = res.sms_ports.per_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    deleteSetting(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.settingService.delete(`setting/${id}`, headers)
            .subscribe((res: {message: string}) => {
                // this.toastr.success('message removed successfully', 'Removed', {timeOut: 3000});
                this.collectionOfcon(this.page);
                // this.sentMessages(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                //  this.toastr.error('Ooops! something went wrong, message is not removed', 'Error', {timeOut: 3000});
            })
    }



}
