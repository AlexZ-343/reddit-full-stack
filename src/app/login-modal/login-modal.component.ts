import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoginService} from '../login/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginModalValidator} from './login-modal.validator';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit, OnDestroy {

  showLoginModal = false;
  private subscriptions: Subscription[] = [];
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private oauthService: OAuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.loggingIn$.subscribe((showLogin: boolean) => {
        this.showLoginModal = showLogin;
      })
    );
    this.setLoginFormControl();
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  public get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  setLoginFormControl(): void {
    // this.loginForm = this.formBuilder.group({
    //   username: new FormControl('', [Validators.required, LoginModalValidator.validateUsername()]),
    //   password: new FormControl('', [Validators.required, LoginModalValidator.validatePassword()])
    // });
  }

  validateLogin(): void {

    // if (userName = something)
    //
    // showError();
  }
  isInvalid(): boolean {
    return false;
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
