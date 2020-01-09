import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent  {

  constructor(private http: HttpClient) {}
  SendMail()// Button click action
  {
    //get api to call email funciton in laravel
   /* this.http.get('http://localhost/FellowShipSMSSystemAPI/public/api/sample-restful-apis').subscribe( data => {
      console.log(data);//Output Come back
    });*/
  }
}
