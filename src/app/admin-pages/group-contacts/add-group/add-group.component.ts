import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupContactsService} from './group-contact.service';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../service/storage.service";
import {AddGroupService} from "../../../service/add-group/add-group.service";
import {GroupContactsComponent} from "../group-contacts.component";
import {ToastrService} from "ngx-toastr";

interface GroupContactsInterface {
  group_name: string;
  description: string;
}
declare let $: any;
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
            this.showNotification01('top','right');
        }, (httpErrorResponse: HttpErrorResponse) => {
        //  this.toastr.error(httpErrorResponse.error.error, 'Error');
        })
  }

    showNotification01(from, align){
        const type = ['success'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "success",
            message: " Group <b>  Added Successfully !!.</b>"

        },{
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
