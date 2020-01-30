import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupMessageService} from './GroupMessage.service';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../../service/storage.service";
import {AddContactService} from "../../../../service/add-contact/add-contact.service";

@Component({
    selector: 'app-add-group-message',
    templateUrl: './add-group-message.component.html',
    styleUrls: ['./add-group-message.component.scss']
})
export class AddGroupMessageComponent implements OnInit {

    public _contactForm: FormGroup;
    public groupNames: any;

    constructor(private _formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<AddGroupMessageComponent>,
                private contactService: AddContactService,
                private storageService: StorageService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.getGroupName();
        this._contactForm = this._formBuilder.group({
            ID: ['', [Validators.required]],
            group_message: ['', [Validators.required]],
            group_name: ['', []],
        });
    }

    /* onSubmit() {
     //  this._contactService.addGroupMessage(this._contactForm.value);
       this.dialogRef.close();
     } */

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
