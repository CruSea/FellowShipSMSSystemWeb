import { Component, OnInit } from '@angular/core';
import {AddBulkMessageComponent} from "./add-bulk-message/add-bulk-message.component";
import {BulkMessageService} from "../../../service/bulk-message/bulk-message.service";
import {MatDialog} from "@angular/material";
import {StorageService} from "../../../service/storage.service";
import {SentMessagesService} from "../../../service/sent-messages/sent-messages.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-bulk-message-list',
  templateUrl: './bulk-message-list.component.html',
  styleUrls: ['./bulk-message-list.component.scss']
})
export class BulkMessageListComponent implements OnInit {

    animal: string;
    firstname: string;
    loading: boolean;

    current_page: string;
    _form: string;
    per_page: number;
    total: number;
    page: number;

    myDate = Date.now();

    dataSource: any;
    ispopupOpened = false;

    constructor(private sentMessagesService: SentMessagesService,
                private storageService:StorageService,
                private dialog?: MatDialog,
                private _contactService?: BulkMessageService) {
    }

    add_bulk_message() {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(AddBulkMessageComponent, {
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
        return this.sentMessagesService.gets(headers, '/getBulkMessage/?page=' + this.page)
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = res.messages.data;
                this.total = res.messages.total;
                this.per_page = res.messages.per_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    deleteMessage(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.sentMessagesService.delete(`message/${id}`, headers)
            .subscribe((res: {message: string}) => {
                // this.toastr.success('message removed successfully', 'Removed', {timeOut: 3000});
                this.collectionOfcon(this.page);
                // this.sentMessages(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                //  this.toastr.error('Ooops! something went wrong, message is not removed', 'Error', {timeOut: 3000});
            })
    }
}
