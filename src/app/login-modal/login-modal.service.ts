import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject, Subscription} from 'rxjs';
import {LoginStatus} from './login-modal.interface';


@Injectable()
export class LoginModalService implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private LoginSuccessSource = new Subject<boolean>();
  public loginSuccess$ = this.LoginSuccessSource.asObservable();
  private LoginAttemptSource = new Subject<number>();
  public loginAttempt$ = this.LoginAttemptSource.asObservable();

  private loginAttempts = 0;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.loginAttempt$.subscribe((loginAttempts: number) => {
        this.loginAttempts = loginAttempts;
      })
    );
  }

  submitLogin(requestParams: HttpParams): void {
    const endpoint = 'http://localhost:8080/login/checkLogin';

    this.http.get(endpoint, { params: requestParams })
      .subscribe((response: LoginStatus) => {
      this.LoginSuccessSource.next(response.loginSuccess);
    });
  }

  resetLoginAttempts(): void {
    this.LoginAttemptSource.next(0);
  }

  increaseLoginCounter(): void {
    this.LoginAttemptSource.next(this.loginAttempts += 1);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
  }

}
