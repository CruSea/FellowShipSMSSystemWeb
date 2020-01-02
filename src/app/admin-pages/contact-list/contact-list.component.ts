import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialog, MatButtonModule } from '@angular/material';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactsService } from '../add-contact/contacts.service';

const MaterialComponents=[
  MatButtonModule
];

@NgModule({
  imports:[MaterialComponents],
  exports:[MaterialComponents]
})

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {

  ispopupOpened = false;
  constructor(private dialog?: MatDialog,
              private _contactService?: ContactsService) {}

  ngOnInit() {}

  get ContactList() {
    return this._contactService.getAllContacts();
  }

  addContact() {
    this.ispopupOpened = true;
    const dialogRef = this.dialog.open(AddContactComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ispopupOpened = false;
    })
  }
}
