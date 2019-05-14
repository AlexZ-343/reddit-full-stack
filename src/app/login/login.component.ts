import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginService: LoginService;

  constructor() { }

  ngOnInit() {
  }

  registering(): void {
    this.loginService.showSignUpModal();
  }

  loggingIn(): void {
    this.loginService.showLoginModal();
  }

}
