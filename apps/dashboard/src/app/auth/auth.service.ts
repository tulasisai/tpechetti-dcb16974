import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const API = "http://localhost:3333";

@Injectable({ providedIn: "root" })
export class AuthService {
  tokenKey = "tv_token";

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${API}/auth/login`, { email, password });
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
