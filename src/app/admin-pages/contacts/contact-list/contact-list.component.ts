import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialog, MatButtonModule } from '@angular/material';
import { AddContactComponent } from '../add-contact/add-contact.component';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AddContactService} from "../../../service/add-contact/add-contact.service";
import {StorageService} from "../../../service/storage.service";

const MaterialComponents=[
  MatButtonModule
];

export interface PeriodicElement {
  contact_id: number;
  full_name: string;
  phone_number: string;
  email: string;
  fellow_dep:string;
  acadamic_dep: string;
  status: string;
  action?: string
}
/*@NgModule({
  imports:[MaterialComponents],
  exports:[MaterialComponents]
})*/
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {
  animal: string;
  firstname: string;
  loading: boolean;

  current_page: string;
  _form: string;
  per_page: number;
  total: number;
  page: number;



  displayedColumns: string[] = ['id', 'full_name', 'phone_number', 'email','fellow_dep','acadamic_dep', 'graduate_year', 'status', 'updated_at', 'action'];
  dataSource: any;

  ispopupOpened = false;
  constructor(private storageService:StorageService,
              private _contactService: AddContactService,
              private dialog?: MatDialog,
    ) { this.page = 1; }


  addContact() {
    this.ispopupOpened = true;
    const dialogRef = this.dialog.open(AddContactComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ispopupOpened = false;
    })
  }


  ngOnInit() {
    this.collectionOfcon(this.page);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  collectionOfcon(e) {
    this.loading = true;
    if(e) {
      this.page = e;
    }
    const headers = new HttpHeaders()
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Methods', 'GET')
        .append('X-Requested-With', 'XMLHttpRequest')
        .append('Access-Control-Allow-Headers', 'Content-Type')
        .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
    return this._contactService.gets(headers, '/contact/1?page='+this.page)
        .subscribe((res: any) => {
          this.loading = false;
          this.dataSource = res.contacts.data;
          this.total = res.contacts.total;
          this.per_page = res.contacts.per_page;
        }, (httpErrorResponse: HttpErrorResponse) => {
          this.loading = false;
        })
  }

}
