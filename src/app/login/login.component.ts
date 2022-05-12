import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public pwd: string = ''
    public usr: string = ''


    constructor(private http: HttpClient) { }



    ngOnInit(): void {
    }

    login () {

        console.log("login")
    }

    register() {
        console.log("register")
    }

}
