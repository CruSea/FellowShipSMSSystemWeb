import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContactsService} from './contacts.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AddContactService} from '../../../service/add-contact/add-contact.service';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
// @ts-ignore
import moment = require("moment");
import {StorageService} from "../../../service/storage.service";
import {GenderInterface} from "../contacts";
import {Moment} from "moment";
import {MatDatepicker} from "@angular/material";


export interface ContactsModalInterface {
    full_name: string;
    phone_number: string;
    email: string;
    acadamic_dep: string;
    fellow_dep: string;
    gender: string;
    graduate_year: string;
}

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.scss']
})

export class AddContactComponent implements OnInit {
    public _contactForm: any;
    public groupNames: any;

    genders: GenderInterface[] = [
        {type: 'male', name: 'Male'},
        {type: 'female', name: 'Female'},
    ];

    date = new FormControl(moment());

    chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
        datepicker.close();
    }

    constructor(private _formBuilder: FormBuilder,
                private contactService: AddContactService,
                private storageService: StorageService,
                private dialogRef: MatDialogRef<AddContactComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    /*onSubmit() {
        this._contactService.addcontact(this._contactForm.value);
        this.dialogRef.close();
    }*/

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.getGroupName();
        this._contactForm = this._formBuilder.group({
            ID: [],
            full_name: ['', [Validators.required]],
            phone_number: ['', [Validators.required]],
            email: ['', [Validators.required]],
            acadamic_dep: ['', [Validators.required]],
            fellow_dep: ['', []],
            gender: ['', [Validators.required]],
            graduate_year: ['', [Validators.required]],
            // gender:['',[Validators.required]],
        });
    }

    contactsModal(contactsModalInterface: ContactsModalInterface) {
        contactsModalInterface['graduate_year'] = moment(this.date.value.toString()).year().toString();
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.contactService.create(contactsModalInterface, headers, '/contact')
            .subscribe((res: { message: string }) => {
                this.dialogRef.close();
                //  this.toastr.success('new under graduate member added successfully', 'Contact', {timeOut: 3000});
            }, (httpErrorResponse: HttpErrorResponse) => {
                //   this.toastr.error(httpErrorResponse.error.error, 'Error', {timeOut: 10000});
                console.log(httpErrorResponse);
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
}

