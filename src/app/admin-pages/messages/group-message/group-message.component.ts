import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GroupMessageService} from './add-group-message/GroupMessage.service';
import {AddGroupMessageComponent} from './add-group-message/add-group-message.component';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.scss']
})
export class GroupMessageComponent implements OnInit {
  myDate = Date.now();

  ispopupOpened = false;
  constructor(private dialog?: MatDialog,
              private _contactService?: GroupMessageService) {}

  ngOnInit() {}

  add_group_message() {
    this.ispopupOpened = true;
    const dialogRef = this.dialog.open(AddGroupMessageComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ispopupOpened = false;
    })
  }

}
