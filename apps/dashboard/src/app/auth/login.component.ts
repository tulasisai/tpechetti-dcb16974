import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  email = "";
  password = "";
  error = "";

  constructor(private auth: AuthService, private router: Router) {
    // Apply dark mode if set
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      document.documentElement.classList.add('dark');
    }
  }

  submit() {
    this.auth.login(this.email, this.password).subscribe(
      (r: any) => {
        this.auth.setToken(r.access_token);
        this.router.navigate(["/tasks"]);
      },
      () => {
        this.error = "Invalid credentials";
      }
    );
  }
}
