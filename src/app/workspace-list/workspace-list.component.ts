import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-workspace-list',
    templateUrl: './workspace-list.component.html',
    styleUrls: ['./workspace-list.component.scss']
})
export class WorkspaceListComponent implements OnInit {
    public workspaces: any = []
    public newName: string = ''

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    ngOnInit(): void {
        this.getWorkspaces()
    }

    newWorkspace() {
        if (this.newName == '')
            return;

        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: this.cookieService.get('token')
            }),
        }
        const body = {
            "name": this.newName,
            "description": this.newName,
            "collaborators": []

        }
        this.http
            .post("https://tasklist-griffith.herokuapp.com/workspaces/new", body, options)
            .subscribe(res => {
                console.log(res)
                this.getWorkspaces();
            });
        this.newName = '';
    }

    getWorkspaces() {
        this.workspaces = []
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: this.cookieService.get('token')
            }),
        }
        this.http
            .get("https://tasklist-griffith.herokuapp.com/workspaces/", options)
            .subscribe(res => {
                const r = res as any
                const wrksp = r.content.workspaces
                const usrId = this.cookieService.get('id')
                for (const w of wrksp) {
                    if (usrId == w.createdBy || w.collaborators.includes(usrId)) {
                        this.workspaces.push(w);
                    }
                }
            });
    }
}
