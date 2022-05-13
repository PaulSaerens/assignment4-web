import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    @Input() task: any;
    @Input() workspace: any;

    public data:any;

    constructor() { }

    ngOnInit(): void {
        this.data = this.getTask();
    }

    getTask() {
        return {
                "name": "3",
                "description": "3",
                "assignedTo": ["62755f25d840778792110ab4", "62755f12d840778792110aaf"],
                "completed": false,
                "priority": "MEDIUM"
            }
    }

    check() {
        console.log(`updated to ${this.data.completed}`)
    }
}
