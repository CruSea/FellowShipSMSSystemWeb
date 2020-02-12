import {Component, OnInit} from '@angular/core';
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {RegisterService} from "../../service/register/register.service";
import {StorageService} from "../../service/storage.service";

export interface RegisterModalInterface {
    first_name: string;
    last_name: string;
    email:string;
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


    register(registerModalInterface:RegisterModalInterface) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        //.append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.registerService.create(registerModalInterface,headers, '/register')
            .subscribe((res: any) => {
                console.log('registered successfully!!!!!!!!!');
                //  this.toastr.success('new under graduate member added successfully', 'Contact', {timeOut: 3000});
            }, (httpErrorResponse: HttpErrorResponse) => {
                //   this.toastr.error(httpErrorResponse.error.error, 'Error', {timeOut: 10000});
                console.log(httpErrorResponse);
            })
    }
}
