import { Injectable } from '@angular/core';
import { Contact } from '../model/Contacts';

@Injectable()
export class ContactsService {

    _contactList: Contact[] = [];

    addcontact(contact: Contact) {
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
