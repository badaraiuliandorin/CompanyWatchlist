import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Constants } from './constants';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    coreRoutesNames = Constants;
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isLoggedIn = this.authenticationService.currentUserValue;
        var userRole = this.authenticationService.getUserRoleId();

        if (!isLoggedIn) {
            this.router.navigate(['login']);
        }

        if (isLoggedIn && (state.url === '/' + Constants.LOGIN)) {
            if (userRole === 1) {
                this.router.navigate(['admin']);
            } else {
                this.router.navigate(['watchlist']);
            }
        }

        if (isLoggedIn && (state.url === '/' + Constants.LOGOUT)) {
            this.authenticationService.logout();
            this.router.navigate(['login']);
        }

        if (isLoggedIn && (state.url === '/' &&
            userRole === 1)) {
            this.router.navigate(['admin']);
        }

        if (isLoggedIn && (state.url === '/' &&
            userRole === 2)) {
            this.router.navigate(['watchlist']);
        }

        if (isLoggedIn && (state.url === '/' + Constants.ADMIN &&
            userRole !== 1)) {
            this.router.navigate(['watchlist']);
        }

        return true;
    }
}