import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

    @Input() workspace: any;

    constructor() { }

    ngOnInit(): void {
    }


    delWorkspace() {
        // todo
        alert(this.workspace._id)
    }

}
