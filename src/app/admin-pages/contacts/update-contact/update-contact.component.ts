import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from "../../../service/storage.service";
import {AddContactService} from "../../../service/add-contact/add-contact.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";

export interface UpdateContactInterface {
    contact_id: string;
    full_name: string;
    phone_number: string;
    email: string;
    acadamic_dep: string;
    fellow_dep: string;
    gender: string;
    graduate_year: number;
    created_at?: string;
    updated_at?: string
}

@Component({
    selector: 'app-update-contact',
    templateUrl: './update-contact.component.html',
    styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent implements OnInit {

    updateContactForm: any;
    public groupNames: any;

    full_name: string;
    phone_number:string;
    email:string;
    acadmic_dep:string;
    fellow_dep:string;
    gender:string;
    graduate_year:string;

  public contact_id: string;

    constructor(private formBuilder: FormBuilder,
                private contactService: AddContactService,
                private storageService: StorageService,
                public dialogRef: MatDialogRef<UpdateContactComponent>,
                @Inject(MAT_DIALOG_DATA) public data: string) {
                    this.contact_id = data;
    }

    onNoClickk(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        console.log(this.contact_id);
        this.getGroupName();
        this.getContacts();

        this.updateContactForm = this.formBuilder.group({
            full_name: [this.full_name, [Validators.required]],
            phone_number: [this.phone_number, [Validators.required]],
            email: ['', [Validators.required]],
            acadamic_dep: ['', [Validators.required]],
            fellow_dep: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            graduate_year: ['', [Validators.required]],
        });
    }


    updateContacts(contactsModalInterface: UpdateContactInterface) {
       console.log(this.contact_id);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'UPDATE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.contactService.patch('contact/',contactsModalInterface,headers,'1')
            .subscribe((res: { message: string }) => {
                console.log(this.contact_id);
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
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

    getContacts() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.contactService.gets(headers, '/contacts/'+7)
            .subscribe((res: any) => {
                 this.full_name = res[0];
                 this.phone_number =res[1];
                 this.email=res[2];
                 this.acadmic_dep=res[3];
                 this.fellow_dep=res[4];
                 this.gender=res[5];
                 this.graduate_year=res[6];

              //  console.log(this.full_name,this.phone_number)
            }, (httpErrorResponse: HttpErrorResponse) => {

            })
    }
}
