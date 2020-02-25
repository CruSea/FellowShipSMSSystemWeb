import {Component, OnInit} from '@angular/core';
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {RegisterService} from "../../service/register/register.service";
import {StorageService} from "../../service/storage.service";

declare let $: any;

export interface RegisterModalInterface {
    first_name: string;
    last_name: string;
    email: string;
    university_name: string;
    university_city: string;
    campus: string;
    phone_number: string;
    password: string;
}

@Component({
    selector: 'app-register-admin',
    templateUrl: './register-admin.component.html',
    styleUrls: ['./register-admin.component.scss']
})

export class RegisterAdminComponent implements OnInit {

    public registerForm: any;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private registerService: RegisterService,
                private storageService: StorageService,
                //private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            university_name: ['', [Validators.required]],
            university_city: ['', [Validators.required]],
            campus: ['', [Validators.required]],
            phone_number: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }


    register(registerModalInterface: RegisterModalInterface) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        //.append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.registerService.create(registerModalInterface, headers, '/register')
            .subscribe((res: any) => {
                console.log('registered successfully!!!!!!!!!');
                this.showNotification('top', 'right')
                //  this.toastr.success('new under graduate member added successfully', 'Contact', {timeOut: 3000});
            }, (httpErrorResponse: HttpErrorResponse) => {
                //   this.toastr.error(httpErrorResponse.error.error, 'Error', {timeOut: 10000});
                console.log(httpErrorResponse);
            })
    }

    showNotification(from, align) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: "Welcome to <b>Campus SMS</b> - Registered Successfully !!."

        }, {
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
