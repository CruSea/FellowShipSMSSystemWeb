import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddGroupMessageComponent} from './add-group-message/add-group-message.component';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../service/storage.service";
import {GroupMessageService} from "../../../service/group-message/group-message.service";

@Component({
    selector: 'app-group-message',
    templateUrl: './group-message.component.html',
    styleUrls: ['./group-message.component.scss']
})
export class GroupMessageComponent implements OnInit {
    loading: boolean;

    current_page: string;
    _form: string;
    per_page: number;
    total: number;
    page: number;
    count:string;

    myDate = Date.now();

    dataSource: any;
    ispopupOpened = false;


    constructor(private storageService:StorageService,
                private _groupMessageService: GroupMessageService,
                private dialog?: MatDialog,) {
    }

    add_group_message() {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(AddGroupMessageComponent, {
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
        return this._groupMessageService.gets(headers, '/group-message/?page=' + this.page)
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = res.group_message.data;
                this.total = res.group_message.total;
                this.per_page = res.group_message.per_page;
                this.count=res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

}
