import { Injectable } from '@angular/core';
import { Contact } from '../../model/Contacts';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ContactsService {

  //  _contactList: Contact[] = [];

    constructor(
        private  httpClient: HttpClient
    ) { }

    collectionofContacts() {
        return this.httpClient.get('http://localhost:8000/api/contact')
    }

    delete(id: string) {
        return this.httpClient.delete(`http:localhost:8000/api/contact/${id}`)
    }

   /* getAllContacts() {
        return this._contactList;
    } */
}
