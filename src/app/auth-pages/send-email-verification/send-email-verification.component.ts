import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AddContactService} from "../../service/add-contact/add-contact.service";
import {StorageService} from "../../service/storage.service";
import {FormBuilder, NgForm, Validators} from "@angular/forms";

@Component({
    selector: 'app-send-email-verification',
    templateUrl: './send-email-verification.component.html',
    styleUrls: ['./send-email-verification.component.scss']
})

export class SendEmailVerificationComponent implements OnInit {

    public email: any;

    constructor(private _formBuilder: FormBuilder,
                private storageService: StorageService,
                private contactService: AddContactService,) {
    }

    ngOnInit() {

    }

    tcode: string;

    submit(event: any) {
        // this.serverName = event.target.value;
        console.log(this.tcode);
        this.sendMail(this.tcode);
    }


    sendMail(email: string) {
        // console.log(email);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.contactService.gets(headers, '/sendResetLink/' + this.tcode)
            .subscribe((res: any) => {
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {

            })
    }


}
