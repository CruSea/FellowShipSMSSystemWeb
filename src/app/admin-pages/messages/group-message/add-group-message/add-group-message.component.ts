import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../../service/storage.service";
import {AddContactService} from "../../../../service/add-contact/add-contact.service";
import {SmsPortService} from "../../../../service/sms-port/sms-port.service";
import {GroupMessageService} from "../../../../service/group-message/group-message.service";

interface GroupMessageModalInterface {
    port_name: string;
    group: string;
    message: string;
}

@Component({
    selector: 'app-add-group-message',
    templateUrl: './add-group-message.component.html',
    styleUrls: ['./add-group-message.component.scss']
})
export class AddGroupMessageComponent implements OnInit {

    public _contactForm: FormGroup;
    public groupNames: any;
    public smsport:any;

    constructor(private _formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<AddGroupMessageComponent>,
                private contactService: AddContactService,
                private portsService:SmsPortService,
                private groupMessage:GroupMessageService,
                private storageService: StorageService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.getGroupName();
        this.getPorts();
        this._contactForm = this._formBuilder.group({
            port_name: ['', [Validators.required]],
            group: ['', [Validators.required]],
            message: ['', [Validators.required]],
        });
    }

    groupmessageModal(messageModalInterface: GroupMessageModalInterface) {
      //  console.log(messageModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.groupMessage.create(messageModalInterface, headers, '/group-message')
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
                this.dialogRef.close();
            })
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

    getPorts() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.portsService.gets(headers, '/port_name')
            .subscribe((res: any) => {
                this.smsport = res.ports;
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

}
