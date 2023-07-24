import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: { username: string, password: string, role: 'admin' | 'member' } | null = null;
  private users: { username: string, password: string, role: 'admin' | 'member' }[] = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'member', password: 'member123', role: 'member' }
  ];

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.isLoggedIn = true;
      this.currentUser = user;
      return true;
    } else {
      this.isLoggedIn = false;
      this.currentUser = null;
      return false;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  //get the user's role
  getUserRole(): 'admin' | 'member' | null {
    if (this.currentUser) {
      return this.currentUser.role;
      
    } else {
      return null;
    }
  }

}
