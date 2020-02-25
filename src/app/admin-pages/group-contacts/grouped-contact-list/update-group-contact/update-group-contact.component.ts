import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {GroupedContactService} from "../../../../service/grouped-contact/grouped-contact.service";
import {StorageService} from "../../../../service/storage.service";

export interface UpdateGroupContactInterface {
    id: string;
    fullname: string;
    phone: string;
    email: string;
    acadamic_department: string;
    fellow_department:string;
    gender :string;
    graduation_year: number;
    created_at?: string;
    updated_at?: string
}

@Component({
  selector: 'app-update-group-contact',
  templateUrl: './update-group-contact.component.html',
  styleUrls: ['./update-group-contact.component.scss']
})
export class UpdateGroupContactComponent implements OnInit {

    updateContactForm: any;
    dataSource: any;

    constructor(
        private formBuilder: FormBuilder,
        private contactService: GroupedContactService,
        private storageService: StorageService,
        public dialogRef: MatDialogRef<UpdateGroupContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UpdateGroupContactInterface) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {

        console.log(this.data);
        this.updateContactForm = this.formBuilder.group({
            fullname: [this.data.fullname, [Validators.required]],
            phone: [this.data.phone, [Validators.required]],
            email: [this.data.email, [Validators.required]],
            gender: [this.data.gender, [Validators.required]],
            fellow_department:[this.data.fellow_department,[Validators.required]],
            acadamic_department: [this.data.acadamic_department, [Validators.required]],
            graduation_year: [this.data.graduation_year, [Validators.required]],
            // fellowship_id: [this.data.fellowship_id, [Validators.required]],
        });
    }


    updateContact(contactsModalInterface: UpdateGroupContactInterface) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.contactService.patch(`grouped-contact/${this.data.id}`, contactsModalInterface, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

   /* getGroupContactsById() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
         return this.groupedContactsService.gets(headers, '/group/' + this.data.id)
    .subscribe((res: any) => {
            this.team_detail = res;
            this.groupedname = res.group.name;
            //  this.getGroupsContactByGroupName(res.group.name, this.page)
        }, (httpErrorResponse: HttpErrorResponse) => {
        })
    } */
}
