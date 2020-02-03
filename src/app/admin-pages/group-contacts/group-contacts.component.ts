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
                private toastr: ToastrService,
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
                this.toastr.success('team deleted successfully', 'Deleted', {timeOut: 3000});
                this.collectionOfcon(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error('Ooops! something went wrong, team is not deleted', 'Error', {timeOut: 3000});
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
}
