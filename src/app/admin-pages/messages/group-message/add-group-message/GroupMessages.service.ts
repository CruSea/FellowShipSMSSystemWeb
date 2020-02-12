import { Injectable } from '@angular/core';
import {GroupMessage} from 'app/admin-pages/model/GroupMessage';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class GroupMessagesService {

    constructor(
        private  httpClient: HttpClient
    ) { }

    collectionofContacts() {
        return this.httpClient.get('http://localhost:8000/api/contact')
    }

    delete(id: string) {
        return this.httpClient.delete(`http:localhost:8000/api/contact/${id}`)
    }
}
