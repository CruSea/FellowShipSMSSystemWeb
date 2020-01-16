import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupContactsService} from './group-contact.service';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../service/storage.service";
import {AddGroupService} from "../../../service/add-group/add-group.service";
import {GroupContactsComponent} from "../group-contacts.component";

interface GroupContactsInterface {
  group_name: string;
  description: string;
}

@Component({
  selector: 'app-add-member',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  public _contactForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private storageService: StorageService,
              private groupService: AddGroupService,
              private dialogRef: MatDialogRef<AddGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      ID: [],
      group_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
   // this._contactService.addContact(this._contactForm.value);
    this.dialogRef.close();
  }

  groupContactsModal(groupContactsModalInterface: GroupContactsInterface) {
    console.log(groupContactsModalInterface);
    const headers = new HttpHeaders()
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Methods', 'POST')
        .append('X-Requested-With', 'XMLHttpRequest')
        .append('Access-Control-Allow-Headers', 'Content-Type')
        .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
    // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
    return this.groupService.create(groupContactsModalInterface, headers, '/group')
        .subscribe((res: {message: string}) => {
          this.dialogRef.close();
         // this.toastr.success('new team added successfully', 'Team', {timeOut: 3000});
        }, (httpErrorResponse: HttpErrorResponse) => {
         // this.toastr.error(httpErrorResponse.error.error, 'Error', {timeOut: 10000});
        })
  }
}
