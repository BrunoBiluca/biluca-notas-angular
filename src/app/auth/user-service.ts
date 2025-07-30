import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userKey = (username: string) => "user_" + username;

  exists(username: string) {
    return !!localStorage.getItem(this.userKey(username));
  }

  get(username: string) {
    return JSON.parse(localStorage.getItem(this.userKey(username))!);
  }

  create(user: any) {
    localStorage.setItem(this.userKey(user.username), JSON.stringify({created_at: new Date(), ...user}));
  }

  login(username: string, password: string): boolean {
    const user = this.get(username);   
    return user.password === password;
  }
}
