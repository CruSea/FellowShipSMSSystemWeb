import { Injectable } from '@angular/core';
import {ContactMessage} from '../../../model/ContactMessage';



@Injectable()
export class ContactMessageService {

    _contactList: ContactMessage[] = [];

    constructor() { }

    add_contact_message(contact: ContactMessage) {
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
