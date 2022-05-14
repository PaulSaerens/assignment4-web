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

    public newCollab: string = ''
    public newTask: string = ''
    public collabs: any = []
    public isHidden: boolean = true;
    public selectedObject = "MEDIUM"
    public selection = ["HIGH", "MEDIUM", "LOW"]
    public taskDesc: string = ''

    private usr: any = []

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    ngOnInit(): void {
        this.isHidden = true
        this.getAllUsers()
        this.getUsers()
    }


    hideCollaborators() {
        this.isHidden = !this.isHidden
    }

    addTask() {
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: this.cookieService.get('token')
            }),
        }
        const body = {
            "name": this.newTask,
            "description": this.taskDesc,
            "assignedTo": [this.cookieService.get('id')],
            "completed": false,
            "priority": this.selectedObject
        }
        this.http
            .post(`https://tasklist-griffith.herokuapp.com/workspaces/${this.workspace._id}/newTask`, body, options)
            .subscribe(res => {
                this.updateWorkspace()
            });
    }



    getAllUsers() {
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: this.cookieService.get('token')
            }),
        }
        this.http
            .get(`https://tasklist-griffith.herokuapp.com/users/all`, options)
            .subscribe(res => {
                const r = res as any;
                for (let user of r.content.users) {
                    this.usr.push({
                        id: user._id,
                        name: user.username
                    })
                }
            });
    }

    nameToId() {
        for (const user of this.usr) {
            if (this.newCollab == user.name) {
                return user.id
            }
        }
        return ''
    }


    addCollab() {
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: this.cookieService.get('token')
            }),
        }
        const body = {
            "collaboratorId": this.nameToId()
        }
        this.http
            .post(`https://tasklist-griffith.herokuapp.com/workspaces/${this.workspace._id}/addCollaborator`, body, options)
            .subscribe(res => {
                this.updateWorkspace()
            });
    }

    delCollab(id: any) {
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: this.cookieService.get('token')
            }),
        }
        this.http
            .delete(
                `https://tasklist-griffith.herokuapp.com/workspaces/${this.workspace._id}/removeCollaborator/${id}`, options
            )
            .subscribe(res => {
                this.updateWorkspace()
            });
    }

    getUsers() {
        this.collabs = []
        const options = {
            params: new HttpParams(),
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: this.cookieService.get('token')
            }),
        }
        for (let col of this.workspace.collaborators) {
            this.http
                .get(`https://tasklist-griffith.herokuapp.com/users/${col}`, options)
                .subscribe(res => {
                    let r = res as any;
                    this.collabs.push({
                        id: r.content.user._id,
                        name: r.content.user.username
                    })
                });
        }
    }

    updateWorkspace() {
        window.location.reload()
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
                this.updateWorkspace()
            });
    }

}
