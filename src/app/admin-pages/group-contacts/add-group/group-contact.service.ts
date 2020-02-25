import { Injectable } from '@angular/core';
import { GroupContact } from 'app/admin-pages/model/GroupContact';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class GroupContactsService {

    _contactList: GroupContact[] = [];

    constructor(
        private  httpClient: HttpClient
    ) { }

    collectionofContacts() {
        return this.httpClient.get('http://localhost:8000/api/group')
    }

    delete(id: string) {
        return this.httpClient.delete(`http:localhost:8000/api/group/${id}`)
    }
}
