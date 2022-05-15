import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() taskId: any;
  @Input() workspace: any;

  public task: any = {}

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.task = this.getTask();
  }

  getTask() {
    const options = {
      params: new HttpParams(),
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.cookieService.get('token')
      }),
    }
    this.http
      .get(`https://tasklist-griffith.herokuapp.com/tasks/${this.taskId}`, options)
      .subscribe(res => {
        const r = res as any
        this.task = r.content.task
        console.log(this.task)
      });
  }

  check() {
    const options = {
      params: new HttpParams(),
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.cookieService.get('token')
      }),
    }
    const body = {}
    console.log("aaaaaaaaa");
    this.http
      .post(`https://tasklist-griffith.herokuapp.com/tasks/${this.taskId}/complete`, body, options)
      .subscribe(res => {
        let r = res as any
        console.log(res);
        this.task.completed = r.content.task.completed;
      });
  }

  deleteTask() {
    const options = {
      params: new HttpParams(),
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.cookieService.get('token')
      }),
    }
    this.http
      .delete(
        `https://tasklist-griffith.herokuapp.com/workspaces/${this.workspace._id}/deleteTask/${this.taskId}`, options
      )
      .subscribe(res => {
        let r = res as any;
        if ('workspace' in r.content)
          this.workspace.tasks = r.content.workspace.tasks
//        window.location.reload()
      });

  }
}
