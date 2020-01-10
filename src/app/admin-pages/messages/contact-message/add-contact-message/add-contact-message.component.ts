import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContactsService} from '../../../contacts/add-contact/contacts.service';
import {ContactMessageService} from './contact-message.service';

@Component({
  selector: 'app-add-contact-message',
  templateUrl: './add-contact-message.component.html',
  styleUrls: ['./add-contact-message.component.scss']
})
export class AddContactMessageComponent implements OnInit {

  public _contactForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddContactMessageComponent>,
              private _contactService: ContactMessageService,
              @Inject(MAT_DIALOG_DATA) public data:any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      ID:[],
      campaign:['',[Validators.required]],
      contact_message:['',[Validators.required]],
    });
  }

  onSubmit(){
    this._contactService.add_contact_message(this._contactForm.value);
    this.dialogRef.close();
  }


}
