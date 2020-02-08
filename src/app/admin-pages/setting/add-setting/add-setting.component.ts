import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SettingService} from "../../../service/setting/setting.service";
import {StorageService} from "../../../service/storage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SettingComponent} from "../setting.component";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";


interface SettingModalInterface {
    value: string;
}

@Component({
  selector: 'app-add-setting',
  templateUrl: './add-setting.component.html',
  styleUrls: ['./add-setting.component.scss']
})
export class AddSettingComponent implements OnInit {

    settingModalForm: any;
    public smsPorts: any;
    public _settingForm: FormGroup;

    constructor(private storageService: StorageService,
                private settingService: SettingService,
                private _formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<AddSettingComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.settingModalForm = this._formBuilder.group({
            value: ['', [Validators.required]],
        });
    }

    /*onSubmit() {
        this._contactService.add_contact_message(this._contactForm.value);
        this.dialogRef.close();
    }*/

    settingModal(settingModalInterface: SettingModalInterface) {
        console.log(settingModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.settingService.create(settingModalInterface, headers, '/setting')
            .subscribe((res: any) => {
                console.log(res);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse);
                this.dialogRef.close();
            })
    }

}
