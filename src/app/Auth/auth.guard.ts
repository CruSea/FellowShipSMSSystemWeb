import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../service/authentication/authentication.service";
import {LoginResponseInterface} from "../service/authentication/authentication.interface";
import {MatDialog} from "@angular/material";
import {PopupErrorComponent} from "../popup-error/popup-error.component";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private matDialog: MatDialog,
                private authService: AuthenticationService,
                private dialog?: MatDialog,) {

    }
    ispopupOpened:boolean;

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authService.isAuthorized()) {
            return true;

        } else {
            this.error_message();
            return false;
        }
    }

    error_message() {
        this.ispopupOpened = true;
        const dialogRef = this.dialog.open(PopupErrorComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ispopupOpened = false;
        })
    }
}
