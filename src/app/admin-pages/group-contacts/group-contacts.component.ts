import {Component, OnInit, Inject, NgModule} from '@angular/core';
import {MatDialog, MatButtonModule} from '@angular/material';
import {AddGroupComponent} from './add-group/add-group.component';
import {GroupContactsService} from './add-group/group-contact.service';
import {AddGroupService} from "../../service/add-group/add-group.service";
import {StorageService} from "../../service/storage.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {AddContactService} from "../../service/add-contact/add-contact.service";
import {GroupContactCountService} from "../../service/Group-Contact-Count/group-contact-count.service";
import {ToastrService} from "ngx-toastr";

export interface PeriodicElement {
    group_id: number;
    group_name: string;
    description: string
    created_by: string;
    updated_by?: string;
    action?: string
}
declare let $: any;
const MaterialComponents = [
    MatButtonModule
];

@Component({
    selector: 'app-group-contacts',
    templateUrl: './group-contacts.component.html',
    styleUrls: ['./group-contacts.component.scss']
})
export class GroupContactsComponent implements OnInit {

    animal: string;
    groupname: string;
    loading: boolean;

    per_page: number;
    total: number;
    page: number;

    mySubscription:any;
    TotalGroupedContact :number;
    id:number;

    displayedColumns: string[] = ['group_id', 'group_name','description','created_by','created_at', 'action'];
    dataSource: any;

    ispopupOpened = false;

    constructor(private matDialog: MatDialog,
                private storageService: StorageService,
                private groupService: AddGroupService,
                private groupContactCount: GroupContactCountService,
                private dialog?: MatDialog) {this.page = 1;}


    /*get ContactList() {
     // return this._contactService.getAllContacts();
    } */



    addContact() {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(AddGroupComponent, {
          //  data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.ispopupOpened = false;
        })

    }
    ngOnInit() {
        this.collectionOfcon(this.page);
        //this.getGroupedContactTotal(this.group_id);
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
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupService.gets(headers, '/group/1?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = res.Groups.data;
                this.per_page = res.Groups.per_page;
                this.total = res.Groups.total;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    deleteContact(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupService.delete(`group/${id}`, headers)
            .subscribe((res: {message: string}) => {
                this.showNotification001('top','right');
                this.collectionOfcon(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
               // this.toastr.error('Ooops! something went wrong, team is not deleted', 'Error', {timeOut: 3000});
            })
    }
          // ################# Display Counted Contact ##############################


    getGroupedContactTotal($id){
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupContactCount.gets(headers, '/totalGroupedContact/${id}')
            .subscribe((res: any) => {
                this.TotalGroupedContact = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    openUpdate(groupId:string){

    }

    showNotification001(from, align){
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
