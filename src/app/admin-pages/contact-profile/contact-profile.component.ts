import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../service/storage.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AddContactService} from "../../service/add-contact/add-contact.service";
import * as jsPDF from 'jspdf';
declare let $: any;
@Component({
    selector: 'app-contact-profile',
    templateUrl: './contact-profile.component.html',
    styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit {
    contactId: number;
    fullname:string;
    phone:string;
    email:string;
    acadamic:string;
    group:string;
    gender:string;
    graduation:string;
    id_no:string;
    photo:string;

@ViewChild('content') content:ElementRef;

    selectedFile:File=null;
    constructor(private _contactService:AddContactService,
                private routerLink:Router,
                private httpclient:HttpClient,
                private activatedRoute: ActivatedRoute,
                private storageService: StorageService,) {
        this.contactId = activatedRoute.snapshot.params.id;
    }

    onFileSelected(event){
        this.selectedFile =event.target.files[0];
    }

    upload_photo(){
        const fd = new FormData();
        fd.append('photo_file',this.selectedFile)
        fd.append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        this.httpclient.post('http://localhost:8000/api/upload_photo/'+this.contactId,fd)
            .subscribe(res=>{
                console.log(res);
            });
    }

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this._contactService.gets(headers, '/getprofile/'+this.contactId)
            .subscribe((res: any) => {
                this.fullname = res[0];
                this.phone=res[1];
                this.email=res[2];
                this.acadamic=res[3];
                this.group=res[4];
                this.gender=res[5];
                this.graduation=res[6];
                this.id_no=res[7];
                this.photo=res[8];
                console.log(res);
                /* this.total = res.contacts.total;
                 this.per_page = res.contacts.per_page;*/
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    deleteProfile() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this._contactService.delete('',headers,`deleteProfile/${this.contactId}`)
            .subscribe((res: { message: string }) => {
                this.deleteNotification('top','right');
                this.routerLink.navigateByUrl('/admin/contact-list');
            }, (httpErrorResponse: HttpErrorResponse) => {
                // this.toastr.error('Ooops! something went wrong, contact is not deleted', 'Error', {timeOut: 3000});
            })
    }

    exportPdf(){
         let doc = new jsPDF();

         let specialElementHandler ={
             '#editor':function (element,renderer) {
                 return true;
             }
         };
         let content =this.content.nativeElement;
         doc.fromHTML(content.innerHTML,15,15,{
             'width':190,
             'elementHandler':specialElementHandler
         });
         doc.save('profile.pdf');
        window.location.reload();
    }



    deleteNotification(from, align){
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
