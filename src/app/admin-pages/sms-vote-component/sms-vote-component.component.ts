import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {SmsPortService} from "../../service/sms-port/sms-port.service";
import {StorageService} from "../../service/storage.service";
import {BulkMessageService} from "../../service/bulk-message/bulk-message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


interface VotesMessageModalInterface {
    port_name: string;
    message: string;
    start_date: string;
    end_date: string;
}

@Component({
    selector: 'app-sms-vote-component',
    templateUrl: './sms-vote-component.component.html',
    styleUrls: ['./sms-vote-component.component.scss'],
})
export class SmsVoteComponentComponent implements OnInit {
    smsport: any;
    _voteForm: any;
    page: number;
    message: any;
    keyA: number;
    keyB: number;
    keyC: number;
    start_date: string;
    end_date: string;
    per_page: number;
    total: number;

    constructor(private portsService: SmsPortService,
                private sentMessagesService: BulkMessageService,
                private _formBuilder: FormBuilder,
                private storageService: StorageService) {
    }

    ngOnInit() {
        this.getPorts();
        this.getvotes();
        this._voteForm = this._formBuilder.group({
            port_name: ['', [Validators.required]],
            message: ['', [Validators.required]],
            start_date: ['', [Validators.required]],
            end_date: ['', [Validators.required]],
        });
    }


    votemessageModal(votesMessageModalInterface: VotesMessageModalInterface) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.sentMessagesService.create(votesMessageModalInterface, headers, '/smsVote')
            .subscribe((res: any) => {

            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
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


    getvotes() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.sentMessagesService.gets(headers, '/getVote')
            .subscribe((res: any) => {
                this.message = res[0];
                this.keyA = res[1];
                this.keyB = res[2];
                this.keyC = res[3];
                this.start_date = res[4];
                this.end_date = res[5];

            }, (httpErrorResponse: HttpErrorResponse) => {

            })
    }


}
