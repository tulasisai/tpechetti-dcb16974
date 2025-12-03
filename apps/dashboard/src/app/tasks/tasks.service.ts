import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class TasksService {
  constructor(private http: HttpClient) {}

  create(dto: any) {
    return this.http.post("/api/tasks", dto);
  }

  list() {
    return this.http.get("/api/tasks");
  }

  update(id: string, dto: any) {
    return this.http.put(`/api/tasks/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete(`/api/tasks/${id}`);
  }
}
