import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OAuthService} from 'angular-oauth2-oidc';
import {ReactiveFormsService} from '../shared/reactive-forms.service';
import {LoginModalService} from './login-modal.service';
import {HttpParams} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {LoginService} from '../login/login.service';
declare var FB: any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit, OnDestroy {

  showLoginModal = false;
  private subscriptions: Subscription[] = [];
  loginForm: FormGroup;
  loginSuccess: boolean;
  loginAttempts: number;
  loginDisabled = false;

  constructor(
    private loginService: LoginService,
    private loginModalService: LoginModalService,
    private oauthService: OAuthService,
    private authService: AuthService,
    private reactiveForms: ReactiveFormsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginModalService.resetLoginAttempts();
    this.subscriptions.push(
      this.loginService.loggingIn$.subscribe((showLogin: boolean) => {
        this.showLoginModal = showLogin;
      }),
      this.loginModalService.loginSuccess$.subscribe((loginStatus: boolean) => {
        this.loginSuccess = loginStatus;
      }),
      this.loginModalService.loginAttempt$.subscribe((loginAttempts: number) => {
        this.loginAttempts = loginAttempts;
      })
    );
    this.setLoginFormControl();
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '895158960848131',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  setLoginFormControl(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submitLogin() {
    FB.login((response) => {
      if (response.authResponse) {

      } else {
      }
    });
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
    return null;
    // return claims.name;
  }

  formIsValid(target: string): boolean {
    return this[target].valid;
  }

  validateLogin(): void {
    if (this.formIsValid('loginForm')) {
      let params = new HttpParams();

      for (const key of Object.keys(this.loginForm.controls)) {
        params = params.append(key, this.loginForm.get(key).value);
      }
      this.loginModalService.submitLogin(params);
      if (this.loginSuccess) {
        // this.authService.login()
      } else {
      this.loginModalService.increaseLoginCounter();
      if (this.loginAttempts > 3) {
          this.loginDisabled = true;
        }
      }
    } else {
      this.reactiveForms.validateAllFormFields(this.loginForm);
    }
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
