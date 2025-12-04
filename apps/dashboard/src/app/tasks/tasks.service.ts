import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const API = "http://localhost:3333";

@Injectable({ providedIn: "root" })
export class TasksService {
  constructor(private http: HttpClient) {}

  create(dto: any) {
    return this.http.post(`${API}/tasks`, dto);
  }

  list() {
    return this.http.get(`${API}/tasks`);
  }

  update(id: string, dto: any) {
    return this.http.put(`${API}/tasks/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete(`${API}/tasks/${id}`);
  }
}
