import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

    @Input() workspace: any;

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    ngOnInit(): void {
    }

    addCollab() {

    }

    delCollab() {

    }

    delWorkspace() {
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: this.cookieService.get('token')
            }),
        }
        this.http
            .delete(`https://tasklist-griffith.herokuapp.com/workspaces/${this.workspace._id}`, options)
            .subscribe(res => {
                console.log(res)
            });
    }

}
