import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LoginService {

  public signingUpSource = new Subject<boolean>();
  public loggingInSource = new Subject<boolean>();

  signingUp$ = this.signingUpSource.asObservable();
  loggingIn$ = this.loggingInSource.asObservable();

  showSignUpModal(): void {
    this.signingUpSource.next(true);
  }

  showLoginModal(): void {
    this.loggingInSource.next(true);
  }



}
