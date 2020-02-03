import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../service/authentication/authentication.service";
import {LoginResponseInterface} from "../service/authentication/authentication.interface";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    admin = {
        role: 'ADMIN'
    }
    super_admin = {
        role: 'SUPER-ADMIN'
    }

    constructor(private authService: AuthenticationService,
                private router: Router) {

    }


    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // return this.authService.isAuthorized()

        if (this.authService.isAuthorized()) {
            //  if(next.data[0]==this.admin.role) {
            return true;

        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
