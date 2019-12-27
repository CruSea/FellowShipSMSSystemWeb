import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupContactsService} from './group-contact.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  public _contactForm: FormGroup;


  constructor(private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddGroupComponent>,
              private _contactService: GroupContactsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      ID: [],
      group_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      no_of_contact: ['', [Validators.required]],
      _date: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this._contactService.addContact(this._contactForm.value);
    this.dialogRef.close();
  }
}
