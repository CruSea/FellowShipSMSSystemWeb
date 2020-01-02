import { Injectable } from '@angular/core';
import { GroupContact } from 'app/admin-pages/model/GroupContact';


@Injectable()
export class GroupContactsService {

    _contactList: GroupContact[] = [];

    constructor() { }

    addContact(contact: GroupContact) {
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
