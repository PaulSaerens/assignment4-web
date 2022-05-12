import { Component, OnInit } from '@angular/core';
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

    constructor(private cookieService: CookieService) { }

    ngOnInit(): void {
        this.cookieUsername = this.cookieService.get('user');
        this.cookieId = this.cookieService.get('id');
        console.log(`usr ${this.cookieUsername}, id ${this.cookieId}, isLogged ${this.isLogged}`)
        if (this.cookieUsername == '' || this.cookieId == '') {
            this.isLogged = false;
            this.cookieService.set('id', '')
            this.cookieService.set('user', '')
        } else {
            this.isLogged = true;
        }
    }
}
