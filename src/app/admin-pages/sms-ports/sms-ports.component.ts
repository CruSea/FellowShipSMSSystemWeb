import {Component, OnInit} from '@angular/core';
import {SmsPortService} from "../../service/sms-port/sms-port.service";
import {StorageService} from "../../service/storage.service";
import {MatDialog} from "@angular/material";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AddSmsPortComponent} from "./add-sms-port/add-sms-port.component";

@Component({
    selector: 'app-sms-ports',
    templateUrl: './sms-ports.component.html',
    styleUrls: ['./sms-ports.component.scss']
})
export class SmsPortsComponent implements OnInit {
    animal: string;
    firstname: string;
    loading: boolean;

    current_page: string;
    _form: string;
    per_page: number;
    total: number;
    page: number;

    public dataSource: any;
    ispopupOpened = false;

    constructor(private matDialog: MatDialog,
                private storageService: StorageService,
                private smsportservice: SmsPortService,
                private dialog?: MatDialog,) {
        this.page = 1;
    }

    add_port() {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(AddSmsPortComponent, {
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
        return this.smsportservice.gets(headers, '/sms-ports/?page=' + this.page)
            .subscribe((res: any) => {
                console.log(res);
                this.loading = false;
                this.dataSource = res.sms_ports;
                this.total = res.sms_ports.total;
                this.per_page = res.sms_ports.per_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }
}
