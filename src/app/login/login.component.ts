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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      window.alert('Login successful!');
      console.log('Login successful!');
      this.router.navigateByUrl('/');
      
    } else {
      this.password = '';
      window.alert('Login failed. Please check your username and password.');
      console.log('Login failed. Please check your username and password.');
    }
  }
}