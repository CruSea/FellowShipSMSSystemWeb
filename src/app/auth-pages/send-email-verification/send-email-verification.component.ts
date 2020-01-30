import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AddContactService} from "../../service/add-contact/add-contact.service";
import {StorageService} from "../../service/storage.service";
import {FormBuilder, Validators} from "@angular/forms";

export interface EmailModalInterface {
    email: string;
}
@Component({
  selector: 'app-send-email-verification',
  templateUrl: './send-email-verification.component.html',
  styleUrls: ['./send-email-verification.component.scss']
})

export class SendEmailVerificationComponent implements OnInit {

    public resetForm:any;

  constructor(private _formBuilder: FormBuilder,
              private storageService: StorageService,
              private contactService: AddContactService,) { }

  ngOnInit() {
     /* this.resetForm = this._formBuilder.group({
          email: ['', [Validators.required]],
      });*/
  }

  sendMail(email: string){
      console.log(email);
      const headers = new HttpHeaders()
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('X-Requested-With', 'XMLHttpRequest')
          .append('Access-Control-Allow-Headers', 'Content-Type')
          .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      return this.contactService.gets(headers, '/sendResetLink/'+email)
          .subscribe((res: any) => {
                 console.log(res);
          }, (httpErrorResponse: HttpErrorResponse) => {

          })
  }
}
