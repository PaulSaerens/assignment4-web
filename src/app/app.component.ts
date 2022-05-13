import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    public title: string = 'Assignment4';
    public cookieUsername: string = '';
    public cookieId: string = '';
    public isLogged: boolean = false;

    constructor(
        private cookieService: CookieService,
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.cookieUsername = this.cookieService.get('user');
        this.cookieId = this.cookieService.get('id');

        if (this.cookieUsername == '' || this.cookieId == '') {
            this.isLogged = false;
            this.cookieService.set('id', '')
            this.cookieService.set('user', '')
            this.router.navigate(['login'])
        } else {
            this.isLogged = true;
            this.router.navigate(['list'])
        }
    }

    logout() {
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: this.cookieService.get('token')
            }),
        }
        const body = {}
        this.http
            .post("https://tasklist-griffith.herokuapp.com/users/logout", body, options)
            .subscribe(res => {
                const r = res as any

                this.cookieService.set('token', '')
                this.cookieService.set('id', '')
                this.cookieService.set('user', '')
                window.location.reload()
                this.router.navigate(['login'])
            });
    }
}
