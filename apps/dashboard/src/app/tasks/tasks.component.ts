import { Component, OnInit } from "@angular/core";
import { TasksService } from "./tasks.service";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html"
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  title = "";
  description = "";

  constructor(
    private svc: TasksService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.list().subscribe((r: any) => (this.tasks = r || []));
  }

  create() {
    if (!this.title) return;
    this.svc.create({ title: this.title, description: this.description }).subscribe(() => {
      this.title = "";
      this.description = "";
      this.load();
    });
  }

  updateStatus(t: any, s: string) {
    this.svc.update(t.id, { status: s }).subscribe(() => this.load());
  }

  remove(t: any) {
    if (confirm("Delete this task?")) {
      this.svc.remove(t.id).subscribe(() => this.load());
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
