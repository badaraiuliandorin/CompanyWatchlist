import { Injectable } from '@angular/core';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public currentUserSubject: BehaviorSubject<any>;
    public snapshot: any;
    private readonly _localStorageName: string = 'AuthToken';
    private readonly _idClaimsKey: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid';
    private readonly _nameClaimsKey: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
    private readonly _emailClaimsKey: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
    private readonly _roleClaimsKey: string = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

    returnUrl: any;

    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
        private jwtHelperService: JwtHelperService ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(this._localStorageName)!));
    }

    public get currentUserValue() {
        return this.getToken();
    }

    public getToken(): string {
        return JSON.parse(localStorage.getItem(this._localStorageName)!);
    }

    login(email: string, password: string) {
        this.currentUserSubject.next(null);
        return this.http.post<any>(`${environment.apiUrl}/api/user/login`, { email, password })
            .pipe(map(t => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.removeItem(this._localStorageName);
                localStorage.setItem(this._localStorageName, JSON.stringify((t as any).token));
                this.currentUserSubject.next((t as any).token);
            }));
    }
    public getUserRoleId(): number | null {
        const authToken = this.getToken();
        if (authToken) {
            const decodedToken = this.jwtHelperService.decodeToken(authToken);
            const claims = decodedToken[this._roleClaimsKey];
            if (claims != null) {
                return Number(claims);
            }
            else {
                return null;
            }
        }
        return null;
    }

    public getUserEmail(): any {
        const authToken = this.getToken();
        if (authToken) {
            const decodedToken = this.jwtHelperService.decodeToken(authToken);
            const claims = decodedToken[this._emailClaimsKey];
            if (claims != null) {
                return claims;
            }
            else {
                return null;
            }
        }
        return null;
    }

    public getUserName(): any {
        const authToken = this.getToken();
        if (authToken) {
            const decodedToken = this.jwtHelperService.decodeToken(authToken);
            const claims = decodedToken[this._nameClaimsKey];
            if (claims != null) {
                return claims;
            }
            else {
                return null;
            }
        }
        return null;
    }

    public getUserId(): any {
        const authToken = this.getToken();
        if (authToken) {
            const decodedToken = this.jwtHelperService.decodeToken(authToken);
            const claims = decodedToken[this._idClaimsKey];
            if (claims != null) {
                return Number(claims);
            }
            else {
                return null;
            }
        }
        return null;
    }

    public isAdmin(): boolean {
        return this.getUserRoleId() === 1;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this._localStorageName);
        this.currentUserSubject.next(null);
    }

    public removeToken(): void {
        localStorage.removeItem(this._localStorageName);
    }
}