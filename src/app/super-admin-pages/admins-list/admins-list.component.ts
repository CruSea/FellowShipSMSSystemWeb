import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {StorageService} from "../../service/storage.service";
import {RegisterService} from "../../service/register/register.service";
import index from "@angular/cdk/typings/schematics/ng-generate/drag-drop";

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent implements OnInit{


    animal: string;
    firstname: string;
    loading: boolean;

    current_page: string;
    _form: string;
    per_page: number;
    total: number;
    page: number;

    checked = false;
    idd :string;

    changed(id:string){
      //  this.assignRole(this.checked,id);
        console.log(this.checked,id)
        this.idd = id;
    }

    displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email','university','campus','phone_number'];
    dataSource: any;

    ispopupOpened = false;

    constructor(private storageService: StorageService,
                private registservice: RegisterService) {
        this.page = 1;
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
        return this.registservice.gets(headers, '/getAdmin')
            .subscribe((res: any) => {
                this.loading = false;
                console.log(res);
                this.dataSource = res.contacts;
               // this.per_page = res.contacts.per_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    assignRole(id:string){
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // console.log(this.storageService.getStorage('accessToken'));
        //  .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.registservice.create(null,headers,'/assignRole/'+this.checked+'/'+id)
            .subscribe((res: { message: string }) => {
              console.log('Role assigned successfully!!!!!');
                //  this.toastr.success('new under graduate member added successfully', 'Contact', {timeOut: 3000});
            }, (httpErrorResponse: HttpErrorResponse) => {
                //   this.toastr.error(httpErrorResponse.error.error, 'Error', {timeOut: 10000});
                console.log(httpErrorResponse);
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
        return this.registservice.delete(`deleteAdmin/${id}`, headers)
            .subscribe((res: { message: string }) => {
                   console.log('Admin Deleted Successfully!!!!!!!!');
                //  this.toastr.success('contact deleted successfully', 'Deleted', {timeOut: 3000});
                this.collectionOfcon(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                //   this.toastr.error('Ooops! something went wrong, contact is not deleted', 'Error', {timeOut: 3000});
            })
    }




    SendMail()// Button click action
  {
    //get api to call email funciton in laravel
   /* this.http.get('http://localhost/FellowShipSMSSystemAPI/public/api/sample-restful-apis').subscribe( data => {
      console.log(data);//Output Come back
    });*/
  }


}
