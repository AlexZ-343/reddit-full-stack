import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import {JwtAuthenticationService} from '../jwt-authentication.service';
import {LoginService} from '../login/login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private oauthService: OAuthService,
              private jwtAuthService: JwtAuthenticationService,
              private router: Router,
              private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.jwtAuthService.currentUserValue;
    if (this.oauthService.hasValidIdToken() || currentUser) {
      // logged in so return true
      return true;
    }

    // this.router.navigate([''], {queryParams: {returnUrl: state.url}});
    this.loginService.showSignUpModal(true);
    return false;
  }

  // canActivate(): boolean {
  //   if (!this.auth.isAuthenticated()) {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }
}
