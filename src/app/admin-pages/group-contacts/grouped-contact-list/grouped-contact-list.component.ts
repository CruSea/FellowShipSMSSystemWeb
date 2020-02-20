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
import {ToastrService} from "ngx-toastr";

declare let $: any;
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
      //  this.toastr.success('Contact Added successfully', 'Deleted', {timeOut: 3000});
        const dialogRef = this.dialog.open(GroupedContactsComponent, {
            data: this.group_id
        });

        dialogRef.afterClosed().subscribe(result => {
             this.collectionOfcon(this.page);
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
           // this.toastr.success('Contact Updated successfully', 'Deleted', {timeOut: 3000});
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

    deleteGroupedContact(id: string) {
      const headers = new HttpHeaders()
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'DELETE')
          .append('X-Requested-With', 'XMLHttpRequest')
          .append('Access-Control-Allow-Headers', 'Content-Type')
          .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
      return this._groupedContact.delete(`groupcontact/${id}`, headers)
          .subscribe((res: {message: string}) => {
              this.showNotification02('top','right');
            this.collectionOfcon(this.page);
          }, (httpErrorResponse: HttpErrorResponse) => {
           // this.toastr.error('Ooops! something went wrong, contact is not deleted', 'Error', {timeOut: 3000});
          })
    }

    exportGroupContact():void{
        window.open('http://localhost:8000/api/exportGroupedContact',"_blank")
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    showNotification02(from, align){
        const type = ['','info','success','warning','danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "danger",
            message: " Group Contact<b>  deleted Successfully !!.</b>"

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }

}
