import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    public pwd: string = ''
    public usr: string = ''

    private cookieUsername: String = '';
    private cookieId: String = '';


    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }



    ngOnInit(): void {
        this.cookieUsername = this.cookieService.get('user')
        this.cookieId = this.cookieService.get('id')
    }

    login() {
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({ "Content-Type": "application/json" }),
        }
        const body = {
            "username": this.usr,
            "password": this.pwd
        }
        this.http
            .post("https://tasklist-griffith.herokuapp.com/users/login", body, options)
            .subscribe(res => {
                const r = res as any
                console.log(r)
                this.cookieService.set('token', "Bearer " + r.content.user.token)
                this.cookieService.set('id', r.content.user._id)
                this.cookieService.set('user', r.content.user.username)
                this.router.navigate(['list'])
            });
        console.log("login")
    }

    register() {
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({ "Content-Type": "application/json" }),
        }
        const body = {
            "username": this.usr,
            "password": this.pwd
        }
        this.http
            .post("https://tasklist-griffith.herokuapp.com/users/register", body, options)
            .subscribe(res => {
                const r = res as any
                console.log(r)
                this.cookieService.set('token', "Bearer " + r.content.user.token)
                this.cookieService.set('id', r.content.user.id)
                this.cookieService.set('user', r.content.user.username)
                this.router.navigate(['list'])
            });
    }

}
