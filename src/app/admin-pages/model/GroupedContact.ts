
import { EmailValidator } from "@angular/forms";

export class Contact{
    ID:number;
    fullname:string;
    phone:number;
    email:EmailValidator;
    acadamic_department:string;
    fellow_department:string;
    gender:string;
    graduation_year:Date;
}
