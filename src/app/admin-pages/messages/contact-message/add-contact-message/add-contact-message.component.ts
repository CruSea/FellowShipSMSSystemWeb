import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContactsService} from '../../../contacts/add-contact/contacts.service';
import {ContactMessageService} from './contact-message.service';
import {StorageService} from "../../../../service/storage.service";
import {SmsPortService} from "../../../../service/sms-port/sms-port.service";
import {SentMessagesService} from "../../../../service/sent-messages/sent-messages.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";

interface MessageModalInterface {
    port_name: string;
    sent_to: string;
    message: string;
}

@Component({
    selector: 'app-add-contact-message',
    templateUrl: './add-contact-message.component.html',
    styleUrls: ['./add-contact-message.component.scss']
})
export class AddContactMessageComponent implements OnInit {

    messageModalForm: any;
   public smsPorts: any;
    public _contactForm: FormGroup;

    constructor(private storageService: StorageService,
                private smsPortService: SmsPortService,
                private sentMessagesService: SentMessagesService,
                private _formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<AddContactMessageComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.getSmsPorts();
        this.messageModalForm = this._formBuilder.group({
            port_name: ['', [Validators.required]],
            sent_to: ['', [Validators.required]],
            message: ['', [Validators.required]],
        });

        this.getSmsPorts()
    }

    /*onSubmit() {
        this._contactService.add_contact_message(this._contactForm.value);
        this.dialogRef.close();
    }*/

    messageModal(messageModalInterface: MessageModalInterface) {
        console.log(messageModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.sentMessagesService.create(messageModalInterface, headers, '/message')
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
                this.dialogRef.close();
            })
    }

    getSmsPorts() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.smsPortService.gets(headers, '/sms-ports')
            .subscribe((res: any) => {
             console.log(res);
                this.smsPorts = res.sms_ports;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }


}
