import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  loginFailed = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      window.alert('Login successful!');
      console.log('Login successful!');
      this.loginFailed = false;
      this.router.navigateByUrl('/');
    } else {
      this.loginFailed = true;
      this.password = '';
      window.alert('Login failed. Please check your username and password.');
      console.log('Login failed. Please check your username and password.');
    }
  }
}
