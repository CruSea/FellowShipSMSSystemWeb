import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../add-contact/contacts.service';
import {AddContactComponent} from '../../add-contact/add-contact.component';
import {ContactMessageService} from './add-contact-message/contact-message.service';
import {MatDialog} from '@angular/material/dialog';
import {AddContactMessageComponent} from './add-contact-message/add-contact-message.component';

@Component({
  selector: 'app-bulk-sms',
  templateUrl: './bulk-sms.component.html',
  styleUrls: ['./bulk-sms.component.scss']
})
export class BulkSmsComponent implements OnInit {

  myDate = Date.now();

  ispopupOpened = false;
  constructor(private dialog?: MatDialog,
              private _contactService?: ContactMessageService) {}

  ngOnInit() {}

  get ContactList() {
    return this._contactService.getAllContacts();
  }

  add_contact_message() {
    this.ispopupOpened = true;
    const dialogRef = this.dialog.open(AddContactMessageComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ispopupOpened = false;
    })
  }

}
