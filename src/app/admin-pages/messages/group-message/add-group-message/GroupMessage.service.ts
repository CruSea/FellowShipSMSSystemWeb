import { Injectable } from '@angular/core';
import {GroupMessage} from 'app/admin-pages/model/GroupMessage';


@Injectable()
export class GroupMessageService {

    _contactList: GroupMessage[] = [];

    constructor() { }

    addGroupMessage(contact: GroupMessage) {
        this._contactList.push(contact);
    }

    removeContact(id: number) {
        const contact = this._contactList.findIndex(c => c.ID === id);
        this._contactList.splice(contact, 1);
    }

    getAllContacts() {
        return this._contactList;
    }
}
