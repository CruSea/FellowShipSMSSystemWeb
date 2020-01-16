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
  fellow_dep:string;
  acadamic_dep: string;
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
  dataSource: any;

  constructor(
      private formBuilder: FormBuilder,
      private contactService: AddContactService,
      private storageService: StorageService,
      public dialogRef: MatDialogRef<UpdateContactComponent>,
      @Inject(MAT_DIALOG_DATA) public data: UpdateContactInterface) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

    console.log(this.data);
    this.updateContactForm = this.formBuilder.group({
      full_name: [this.data.full_name, [Validators.required]],
      phone_number: [this.data.phone_number, [Validators.required]],
      email: [this.data.email, [Validators.required]],
     // gender: [this.data.gender, [Validators.required]],
      fellow_dep:[this.data.fellow_dep,[Validators.required]],
      acadamic_dep: [this.data.acadamic_dep, [Validators.required]],
      graduate_year: [this.data.graduate_year, [Validators.required]],
      // fellowship_id: [this.data.fellowship_id, [Validators.required]],
    });
  }


  updateContact(contactsModalInterface: UpdateContactInterface) {
    const headers = new HttpHeaders()
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Methods', 'POST')
        .append('X-Requested-With', 'XMLHttpRequest')
        .append('Access-Control-Allow-Headers', 'Content-Type')
        .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
    return this.contactService.patch(`contact/${this.data.contact_id}`, contactsModalInterface, headers)
        .subscribe((res: {message: string}) => {
          console.log(res.message);
          this.dialogRef.close();
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse.status);
          console.log(httpErrorResponse);
        })
  }
}
