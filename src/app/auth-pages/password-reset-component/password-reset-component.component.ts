import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {StorageService} from "../../service/storage.service";
import {PassResetService} from "../../service/password-Reset/pass-reset.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-password-reset-component',
    templateUrl: './password-reset-component.component.html',
    styleUrls: ['./password-reset-component.component.scss']
})
export class PasswordResetComponentComponent implements OnInit {

    email: string;
    password: string;

    constructor(private loginForm: FormBuilder,
                private storageService: StorageService,
                private passResetService: PassResetService,) {
    }

    ngOnInit() {

    }

    submit(event: any) {
        // this.serverName = event.target.value;
        console.log(this.email);
        console.log(this.password);
        this.sendMail(this.email, this.password);
    }


    sendMail(email: string, password: string) {
        // console.log(email);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.passResetService.gets(headers, '/passwordReset/' + this.email + '/' + this.password)
            .subscribe((res: any) => {
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {

            })
    }

}
