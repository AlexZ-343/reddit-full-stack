import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit() {
  }

  registering(): void {
    this.loginService.showSignUpModal(true);
    this.loginService.showLoginModal(false);
  }

  loggingIn(): void {
    this.loginService.showLoginModal(true);
    this.loginService.showSignUpModal(false);
  }

}
