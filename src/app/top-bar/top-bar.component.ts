import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: [ './top-bar.component.css' ]
})
export class TopBarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isUserAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  logout() {
    this.authService.logout();
    window.alert('Logout successful!');
    this.router.navigateByUrl('/');
  }
}
