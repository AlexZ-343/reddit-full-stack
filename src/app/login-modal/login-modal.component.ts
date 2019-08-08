import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoginService} from '../login/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginModalValidator} from './login-modal.validator';
import {OAuthService} from 'angular-oauth2-oidc';
import {ReactiveFormsService} from '../shared/reactive-forms.service';
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

  constructor(
    private loginService: LoginService,
    private oauthService: OAuthService,
    private reactiveForms: ReactiveFormsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.loggingIn$.subscribe((showLogin: boolean) => {
        this.showLoginModal = showLogin;
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

  setLoginFormControl(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40),
        LoginModalValidator.checkUsername]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40),
        LoginModalValidator.checkPassword])
    });
  }

  formIsValid(target: string): boolean {
    return this[target].valid;
  }

  validateLogin(): void {
   if (this.formIsValid('loginForm')) {
     this.submitLogin();
   } else {
     this.reactiveForms.validateAllFormFields(this.loginForm);
   }

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
