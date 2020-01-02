import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialog, MatButtonModule } from '@angular/material';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupContactsService } from './add-group/group-contact.service';

const MaterialComponents =[
  MatButtonModule
];

@NgModule({
  imports:[MaterialComponents],
  exports:[MaterialComponents]
})

@Component({
  selector: 'app-group-contacts',
  templateUrl: './group-contacts.component.html',
  styleUrls: ['./group-contacts.component.scss']
})
export class GroupContactsComponent implements OnInit {

  ispopupOpened = false;
  constructor(private dialog?: MatDialog,
              private _contactService?: GroupContactsService) {}

  ngOnInit() {}

  get ContactList() {
    return this._contactService.getAllContacts();
  }

  addContact() {
    this.ispopupOpened = true;
    const dialogRef = this.dialog.open(AddGroupComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ispopupOpened = false;
    })

  }
}
