import { Injectable } from '@angular/core';
import {ServicesInterface} from "../services.interface";
import {ServicesService} from "../services.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SmsPortService extends ServicesService implements ServicesInterface {
    constructor(httpClient: HttpClient) {
        super(httpClient, 'api')
    }
}
