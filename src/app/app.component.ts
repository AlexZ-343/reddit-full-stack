import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'reddit-full-stack';
  signingUp = false;
  loggingIn = false;

  loginService: LoginService;
  private subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.loggingIn$.subscribe((loggingIn: boolean) => {
        this.loggingIn = loggingIn;
      }),
      this.loginService.signingUp$.subscribe((signingUp: boolean) => {
        this.signingUp = signingUp;
      })
    );

    }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
  }
}


