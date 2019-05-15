import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {SignUpModalComponent} from './sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(LoginModalComponent) loginModalComponent;
  @ViewChild(SignUpModalComponent) signUpComponent;
  title = 'reddit-full-stack';

  constructor() {}


  ngOnInit() {




    }

  ngOnDestroy() {
    // this.subscriptions.forEach((sub: Subscription) => {
    //   if (sub && !sub.closed) {
    //     sub.unsubscribe();
    //   }
    // });
  }
}


