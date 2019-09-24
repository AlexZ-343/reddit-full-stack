import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService
  ) {}

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  // public get loggedIn(): boolean{
  //   return localStorage.getItem('access_token') !==  null;
  // }
}
