import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupMessageService} from './GroupMessage.service';

@Component({
  selector: 'app-add-group-message',
  templateUrl: './add-group-message.component.html',
  styleUrls: ['./add-group-message.component.scss']
})
export class AddGroupMessageComponent implements OnInit {

  public _contactForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddGroupMessageComponent>,
              private _contactService: GroupMessageService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      ID: ['', [Validators.required]],
      group_message: ['', [Validators.required]],
      group_name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this._contactService.addGroupMessage(this._contactForm.value);
    this.dialogRef.close();
  }

}
