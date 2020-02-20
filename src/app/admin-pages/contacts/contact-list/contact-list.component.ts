
import {Component, OnInit, Inject, NgModule, ElementRef, ViewChild} from '@angular/core';
import {MatDialog, MatButtonModule} from '@angular/material';
import {AddContactComponent} from '../add-contact/add-contact.component';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AddContactService} from "../../../service/add-contact/add-contact.service";
import {StorageService} from "../../../service/storage.service";
import {UpdateContactComponent, UpdateContactInterface} from "../update-contact/update-contact.component";
import {ImportContactComponent} from "../import-contact/import-contact.component";


const MaterialComponents = [
    MatButtonModule
];

export interface PeriodicElement {
    contact_id: number;
    full_name: string;
    phone_number: string;
    email: string;
    acadamic_dep: string;
    fellow_dep: string;
    gender: string;
    status: string;
    action?: string
}
declare let $: any;

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


    displayedColumns: string[] = ['id', 'full_name', 'phone_number', 'email','acadamic_dep','fellow_dep','gender','graduate_year', 'status', 'updated_at', 'action'];
    dataSource: any;

    ispopupOpened = false;

    constructor(private matDialog: MatDialog,
                private storageService: StorageService,
                private _contactService: AddContactService,
                private dialog?: MatDialog,) {
        this.page = 1;
    }


    addContact() {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(AddContactComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.ispopupOpened = false;
        })
    }

    openUpdate(Id:string) {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(UpdateContactComponent, {
            data: {Id}.valueOf(),
            width: '700px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
          //  this.toastr.success('contact updated successfully', 'Add', {timeOut: 3000});
           // this.animal = result;
        });
    }

    ngOnInit() {
        this.collectionOfcon(this.page);
    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfcon(e) {
        this.loading = true;
        if (e) {
            this.page = e;
        }
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this._contactService.gets(headers, '/contact/1?page=' + this.page)
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = res.contact;
               /* this.total = res.contacts.total;
                this.per_page = res.contacts.per_page;*/
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
        return this._contactService.delete(`contact/${id}`, headers)
            .subscribe((res: { message: string }) => {
                this.showNotification02('top','right');
                this.collectionOfcon(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                  // this.toastr.error('Ooops! something went wrong, contact is not deleted', 'Error', {timeOut: 3000});
            })
    }

    openImportContact(): void {
         const dialogRef = this.matDialog.open(ImportContactComponent, {
            height: '200px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.animal = result;
        });
    }

      exportContact(){
        //  this.toastr.success('contact deleted successfully', 'Deleted', {timeOut: 3000});
       return window.open('http://localhost:8000/api/exportContact',"_blank")
    }


    showNotification02(from, align){
        const type = ['','info','success','warning','danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: "Contact <b>  deleted Successfully !!.</b>"

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
