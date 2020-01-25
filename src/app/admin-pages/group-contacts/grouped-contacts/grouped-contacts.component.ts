import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {GenderInterface} from "../../contacts/contacts";
// @ts-ignore
import moment = require("moment");
import {Moment} from "moment";
import {MatDatepicker} from "@angular/material/datepicker";
import {GroupedContactService} from "../../../service/grouped-contact/grouped-contact.service";
import {StorageService} from "../../../service/storage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContactsModalInterface} from "../../contacts/add-contact/add-contact.component";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {ActivatedRoute} from "@angular/router";
//import { MomentDateAdapter } from '@angular/material-moment-adapter';

//const moment = _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY',
    },
    display: {
        dateInput: 'YYYY'
    },
};

export interface ContactsModalInterface {
    fullname: string;
    phone: string;
    email: string;
    acadamic_department: string;
    fellow_department: string;
    gender: string;
    graduation_year: string;
    contacts_id: number;
}

@Component({
    selector: 'app-grouped-contacts',
    templateUrl: './grouped-contacts.component.html',
    styleUrls: ['./grouped-contacts.component.scss'],
    providers: [
        // {provide: DateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class GroupedContactsComponent implements OnInit {

    group_id: number;

    contactsModalForm: any;
    genders: GenderInterface[] = [
        {type: 'male', name: 'Male'},
        {type: 'female', name: 'Female'},
    ];

    public _contactForm: any;

    date = new FormControl(moment());

    chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
        datepicker.close();
    }

    constructor(
        private _formBuilder: FormBuilder,
        private _contactService: GroupedContactService,
        private storageService: StorageService,
        private activatedRoute: ActivatedRoute,
        public dialogRef: MatDialogRef<GroupedContactsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: number) {
       this.group_id = data;
    }

    onSubmit() {
        // this._contactService.addcontact(this._contactForm.value);
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        console.log(this.group_id);
        this._contactForm = this._formBuilder.group({
            fullname: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required]],
            acadamic_department: ['', [Validators.required]],
           // fellow_department: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            //  fellowship_id: [null, [Validators.required]],
            graduation_year: ['', [Validators.required]],
    });
    }

    contactsModal(contactsModalInterface: ContactsModalInterface) {
        console.log(contactsModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this._contactService.create(contactsModalInterface, headers, '/groupcontact/'+ this.group_id)
            .subscribe((res: { message: string }) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}
