import {Component, OnInit} from '@angular/core';
import {AddContactComponent} from "../../contacts/add-contact/add-contact.component";
import {StorageService} from "../../../service/storage.service";
import {MatDialog} from "@angular/material/dialog";
import {GroupedContactsComponent} from "../grouped-contacts/grouped-contacts.component";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {GroupedContactService} from "../../../service/grouped-contact/grouped-contact.service";
import {
    UpdateGroupContactComponent,
    UpdateGroupContactInterface
} from "./update-group-contact/update-group-contact.component";

export interface PeriodicElement {
    id: number;
    fullname: string;
    phone: string;
    email: string;
    acadamic_department: string;
    fellow_department: string;
    gender: string;
    graduation_year: string;
    // status: string;
    // action?: string
}

@Component({
    selector: 'app-grouped-contact-list',
    templateUrl: './grouped-contact-list.component.html',
    styleUrls: ['./grouped-contact-list.component.scss']
})
export class GroupedContactListComponent implements OnInit {

    fullname: string;
    phone: string;
    email: string;
    acadamic_department: string;
    fellow_department :string;
    gender: string;
    graduation_year: string;

    id: string;
    groupedname: string;
    animal: string;
    group_id: string;
    team_detail: any;
    loading: boolean;

    per_page: number;
    total: number;
    page: number;

    ispopupOpened = false;
    displayedColumns: string[] = ['fullname', 'phone', 'email', 'acadamic_department', 'fellow_department','gender','graduation_year', 'action'];
    dataSource: any;

    // private groupedContactsService: GroupedContactService,
    constructor(private matDialog: MatDialog,
                private storageService: StorageService,
                private activatedRoute: ActivatedRoute,
                private _groupedContact: GroupedContactService,
                private dialog?: MatDialog) {
        this.group_id = activatedRoute.snapshot.params.id;
        this.page = 1;
    }

    addContact() {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(GroupedContactsComponent, {
            data: this.group_id
        });

        dialogRef.afterClosed().subscribe(result => {
            // this.collectionOfcon(this.page);
            this.ispopupOpened = false;
        })
    }


    ngOnInit() {
        this.collectionOfcon(this.page);
    }

    openUpdates(data: UpdateGroupContactInterface): void {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(UpdateGroupContactComponent, {
            data: {data},
            width: '700px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.animal = result;
        });
    }

    // #######################################################

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
        return this._groupedContact.gets(headers, '/groupcontact/'+this.group_id+'?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = res.Group_Contacts.data;
                this.total = res.Group_Contacts.total;
                this.per_page = res.Group_Contacts.per_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    /*getGroupsById() {
       const headers = new HttpHeaders()
           .append('Access-Control-Allow-Origin', '*')
           .append('Access-Control-Allow-Methods', 'GET')
           .append('X-Requested-With', 'XMLHttpRequest')
           .append('Access-Control-Allow-Headers', 'Content-Type')
           .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      // return this.groupedContactsService.gets(headers, '/group/' + this.group_id)
           .subscribe((res: any) => {
             this.team_detail = res;
             this.groupedname = res.group.name;
           //  this.getGroupsContactByGroupName(res.group.name, this.page)
           }, (httpErrorResponse: HttpErrorResponse) => {
           })
     }

    // ######### search #############

    /* getGroupsContactByGroupName(name: string, e) {
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
       // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
       return this.groupedContactsService.gets(headers, '/team/members/' + name +'?page='+ this.page)
           .subscribe((res: any) => {
             this.loading = false;
             this.dataSource = res.contacts.data;
             this.per_page = res.contacts.per_page;
             this.total = res.contacts.total;
           }, (httpErrorResponse: HttpErrorResponse) => {
             this.loading = false;
           })
     }*/

    /*deleteGroupedContact(id: string) {
      const headers = new HttpHeaders()
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'DELETE')
          .append('X-Requested-With', 'XMLHttpRequest')
          .append('Access-Control-Allow-Headers', 'Content-Type')
          .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
      return this.groupedContactsService.delete(`team/members/${this.team_detail.team.name}/${id}`, headers)
          .subscribe((res: {message: string}) => {
            this.toastr.success('contact deleted successfully', 'Deleted', {timeOut: 3000});
            this.getGroupsById();
          }, (httpErrorResponse: HttpErrorResponse) => {
            this.toastr.error('Ooops! something went wrong, contact is not deleted', 'Error', {timeOut: 3000});
          })
    }*/



    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
