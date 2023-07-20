import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = true;
  private username = 'admin';
  private password = 'admin987654'; 

  // Call this method to log in the user
  login(username: string, password: string): boolean {
    if (this.username === username && this.password === password) {
      this.isLoggedIn = true;
      return true;
    } else {
      return false;
    }
  }

  // Call this method to log out the user
  logout() {
    this.isLoggedIn = false;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
