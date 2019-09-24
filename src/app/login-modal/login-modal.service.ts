import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject, Subscription} from 'rxjs';
import {LoginStatus} from './login-modal.interface';


@Injectable()
export class LoginModalService implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private LoginTokenSource = new Subject<string>();
  public loginToken$ = this.LoginTokenSource.asObservable();
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

  submitLogin(loginFormData: string): void {

    const endpoint = 'http://localhost:8080/login';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Accept: 'application/json'
      })
    };

    this.http.post(endpoint, {loginFormData}, {options: {headers: httpOptions}, observe: 'response'})
      .subscribe((response) => {
        response.headers.get('Authorization');
      // this.LoginSuccessSource.next(response.headers.get(''));
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
