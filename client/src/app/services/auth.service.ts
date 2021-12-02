import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Response } from '../models/response.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedIn$ = new BehaviorSubject<boolean>(false);
    public user: User | null;

    constructor(private http: HttpClient, private router: Router) {
        const jwt_token = sessionStorage.getItem('jwt_token');
        this.isLoggedIn$.next(!!jwt_token);

        const user = JSON.parse(sessionStorage.getItem('user') as string);
        this.user = user;
    }

    getIsLoggedIn$() {
        return this.isLoggedIn$.asObservable();
    }

    getUser() {
        return this.user;
    }

    login(email: string, password: string) {
        return this.http
            .post('http://localhost:8080/api/auth/login', {
                email,
                password,
            })
            .subscribe((resp: Response) => {
                if (resp.message) {
                    alert(resp.message);
                } else if (resp.jwt_token && resp.user) {
                    this.isLoggedIn$.next(true);
                    this.user = resp.user;

                    sessionStorage.setItem('jwt_token', resp.jwt_token);
                    sessionStorage.setItem('user', JSON.stringify(resp.user));
                    this.router.navigate(['/']);
                } else {
                    alert('Login Error');
                }
            });
    }

    logout() {
        this.isLoggedIn$.next(false);
        this.user = null;
        sessionStorage.removeItem('jwt_token');
        this.router.navigate(['/login']);
    }

    register(
        firstname: string,
        lastname: string,
        email: string,
        password: string
    ) {
        return this.http
            .post('http://localhost:8080/api/auth/register', {
                firstname,
                lastname,
                email,
                password,
            })
            .subscribe((resp: Response) => {
                if (resp.message) {
                    alert(resp.message);
                    if (resp.message === 'Profile created successfully') {
                        this.router.navigate(['/login']);
                    }
                } else {
                    alert('Register Error');
                }
            });
    }
}
