import { Injectable } from '@angular/core';

export class UserNotFoundError extends Error {}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userKey = (username: string) => 'user_' + username;

  exists(username: string) {
    return !!localStorage.getItem(this.userKey(username));
  }

  get(username: string) {
    return JSON.parse(localStorage.getItem(this.userKey(username))!);
  }

  create(user: any) {
    localStorage.setItem(
      this.userKey(user.username),
      JSON.stringify({ created_at: new Date(), ...user })
    );
  }

  login(username: string, password: string): boolean {
    const user = this.get(username);
    if (!user) {
      throw new UserNotFoundError();
    }

    const isLogged = user.username === username && user.password === password;

    if (isLogged) {
      localStorage.setItem('token', JSON.stringify({ username: username }));
    }

    return isLogged;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
