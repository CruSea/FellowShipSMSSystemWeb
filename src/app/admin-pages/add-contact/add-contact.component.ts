import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContactsService} from './contacts.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
//import {ToastrService} from 'ngx-toastr';
import {AddContactService} from '../../service/add-contact/add-contact.service';


export interface ContactsModalInterface {
  full_name: string;
  phone_num: string;
  gender: string;
  email: string;
  fellow_dep: string;
  graduate_date: string;
}

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})

export class AddContactComponent implements OnInit {
  public _contactForm: any;

  constructor(private _formBuilder: FormBuilder,
              private contactService: AddContactService,
              private _contactService: ContactsService,
              private dialogRef: MatDialogRef<AddContactComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onSubmit() {
    this._contactService.addcontact(this._contactForm.value);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      ID: [],
      full_name: ['', [Validators.required]],
      phone_num: ['', [Validators.required]],
      email: ['', [Validators.required]],
      fellow_dep: ['', [Validators.required]],
      graduate_date: ['', [Validators.required]],
      // gender:['',[Validators.required]],
    });
  }

}

