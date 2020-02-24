import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../service/storage.service";
import {SmsPortService} from "../../../service/sms-port/sms-port.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";

declare let $: any;
interface PortModalInterface {
    port_name: string;
    port_type: string;
    port_id: number;
    campaign_id: number;
}
@Component({
  selector: 'app-add-sms-port',
  templateUrl: './add-sms-port.component.html',
  styleUrls: ['./add-sms-port.component.scss']
})
export class AddSmsPortComponent implements OnInit {
    portModalForm: any;
    public smsPorts: any;
    public _contactForm: FormGroup;

    constructor(private storageService: StorageService,
                private smsPortService: SmsPortService,
                private _formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<AddSmsPortComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.portModalForm = this._formBuilder.group({
            port_name: ['', [Validators.required]],
            port_type:['',[Validators.required]],
            port_id: ['', [Validators.required]],
            campaign_id: ['', [Validators.required]],
        });
    }

    portModal(portModalInterface: PortModalInterface) {

        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.smsPortService.create(portModalInterface, headers, '/storeSmsPort')
            .subscribe((res: { message: string }) => {
                console.log(res.message);
                this.dialogRef.close();
                this.showNotification01('top','right');
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
                this.dialogRef.close();
            })
    }

    showNotification01(from, align){
        const type = ['','info','success','warning','danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "success",
            message: "Port <b>  Added Successfully !!.</b>"

        },{
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
