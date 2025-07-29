import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  imports: [],
  template: `
  <h1>Sign Up!</h1>
  <input type="text" name="username" />
  <input type="text" name="email" />
  <input type="password" name="password" />
  <button type="submit">Criar</button>
  `
})
export class Signup {

}
