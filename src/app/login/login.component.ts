import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

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


    constructor(private http: HttpClient, private cookieService: CookieService) { }



    ngOnInit(): void {
        this.cookieUsername = this.cookieService.get('user')
        this.cookieId = this.cookieService.get('id')
    }

    login() {
        const options = {
            params: new HttpParams()
        }
        const body = {
            "username": this.usr,
            "password": this.pwd
        }
        this.http
            .post("https://tasklist-griffith.herokuapp.com/users/login", body, options)
            .subscribe(res => console.log(res));
        console.log()
        console.log("login")
    }

    register() {
        console.log("register")
    }

}
