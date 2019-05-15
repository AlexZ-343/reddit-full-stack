import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit, OnDestroy {

  showLoginModal = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.loggingIn$.subscribe((showLogin: boolean) => {
        this.showLoginModal = showLogin;
      })
    );
  }

  closeModal(): void {
    this.loginService.showLoginModal(false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
  }
}
