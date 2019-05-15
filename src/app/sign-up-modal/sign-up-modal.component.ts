import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit, OnDestroy {

  showSignUpModal = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.signingUp$.subscribe((signingUp: boolean) => {
        this.showSignUpModal = signingUp;
      })
    );
  }

  closeModal(): void {
    this.loginService.showSignUpModal(false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
  }

}
