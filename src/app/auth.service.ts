import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users:any[] = [];
  private isLoggedIn = false;
  private currentUser: { username: string, password: string, role: any } | null = null;

  constructor(private http: HttpClient) {
    this.fetchUsersFromAPI();
  }

  private fetchUsersFromAPI() {
    const userURL = 'https://dummyjson.com/users'; // Update the API URL accordingly
    this.http.get<{ users: UserInterface[] }>(userURL).subscribe(
      (userList: { users: UserInterface[] }) => {
        console.log('API Response:', userList);
        this.users = userList.users.map(user => ({
          username: user.username,
          password: user.password,
        }));
      },
      (error) => {
        console.error('Error fetching users from API:', error);
      }
    );
  }

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

  getUserRole(): 'admin' | 'member' | null {
    if (this.currentUser) {
      return this.currentUser.role;
    } else {
      return null;
    }
  }
}
