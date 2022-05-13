import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-workspace-list',
    templateUrl: './workspace-list.component.html',
    styleUrls: ['./workspace-list.component.scss']
})
export class WorkspaceListComponent implements OnInit {
    public workspaces: any = []
    public newName: string = ''

    constructor() { }

    ngOnInit(): void {
        this.getWorkspaces()
    }

    newWorkspace() {
        if (this.newName == '')
            return;

        // todo
        alert(this.newName)
        this.newName = '';
    }

    // todo
    getWorkspaces() {
        this.workspaces = [
            {
                "_id": "62756a465d55fd76017b7e8e",
                "name": "Shared Workspace",
                "description": "This is a shared workspace",
                "createdBy": "62755f12d840778792110aaf",
                "collaborators": [],
                "tasks": [],
                "createdAt": "2022-05-06T18:34:46.540Z",
                "updatedAt": "2022-05-09T17:41:19.418Z",
                "__v": 10
            },
            {
                "_id": "627bda411c7c104ac91dede2",
                "name": "NEW WORKSPACE",
                "description": "NEW WORKSPACE",
                "createdBy": "627bda0a1c7c104ac91dedd7",
                "collaborators": [],
                "tasks": [
                    "627bdf0d63e7123abd2931e0",
                    "627be3cc14f30f11a32ab855",
                    "627be3d114f30f11a32ab85c",
                    "627be3ed14f30f11a32ab863"
                ],
                "createdAt": "2022-05-11T15:46:09.264Z",
                "updatedAt": "2022-05-11T16:27:25.497Z",
                "__v": 8
            },
            {
                "_id": "627d1071504023563452cb78",
                "name": "First Workspace",
                "description": "This is my first workspace",
                "createdBy": "627bda0a1c7c104ac91dedd7",
                "collaborators": [
                    "6275468af7e983f5a5f50234"
                ],
                "tasks": [],
                "createdAt": "2022-05-12T13:49:37.605Z",
                "updatedAt": "2022-05-12T13:49:37.605Z",
                "__v": 0
            },
            {
                "_id": "627d1074504023563452cb7e",
                "name": "First Workspace",
                "description": "This is my first workspace",
                "createdBy": "627bda0a1c7c104ac91dedd7",
                "collaborators": [
                    "6275468af7e983f5a5f50234"
                ],
                "tasks": [],
                "createdAt": "2022-05-12T13:49:40.869Z",
                "updatedAt": "2022-05-12T13:49:40.869Z",
                "__v": 0
            },
            {
                "_id": "627d107e504023563452cb84",
                "name": "First Workspace",
                "description": "This is my first workspace",
                "createdBy": "627bda0a1c7c104ac91dedd7",
                "collaborators": [
                    "6275468af7e983f5a5f5023e"
                ],
                "tasks": [],
                "createdAt": "2022-05-12T13:49:50.771Z",
                "updatedAt": "2022-05-12T13:49:50.771Z",
                "__v": 0
            },
            {
                "_id": "627d1086504023563452cb8a",
                "name": "First Workspace",
                "description": "This is my first workspace",
                "createdBy": "627bda0a1c7c104ac91dedd7",
                "collaborators": [
                    "6275468af7e983f5a5f50234"
                ],
                "tasks": [],
                "createdAt": "2022-05-12T13:49:58.358Z",
                "updatedAt": "2022-05-12T13:49:58.358Z",
                "__v": 0
            },
            {
                "_id": "627d1089504023563452cb90",
                "name": "First Workspace",
                "description": "This is my first workspace",
                "createdBy": "627bda0a1c7c104ac91dedd7",
                "collaborators": [
                    "6275468af7e983f5a5f50234"
                ],
                "tasks": [],
                "createdAt": "2022-05-12T13:50:01.668Z",
                "updatedAt": "2022-05-12T13:50:01.668Z",
                "__v": 0
            }
        ]
    }

}
