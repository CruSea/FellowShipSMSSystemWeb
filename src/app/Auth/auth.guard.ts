import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../service/authentication/authentication.service";
import {LoginResponseInterface} from "../service/authentication/authentication.interface";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService,
                private router: Router) {

    }


    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot):boolean{

       // return this.authService.isAuthorized()
        if (this.authService.isAuthorized()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}
