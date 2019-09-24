import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LoginService {

  public signingUpSource = new Subject<boolean>();
  public loggingInSource = new Subject<boolean>();

  signingUp$ = this.signingUpSource.asObservable();
  loggingIn$ = this.loggingInSource.asObservable();

  showSignUpModal(isOpen: boolean): void {
    this.signingUpSource.next(isOpen);
  }

  showLoginModal(isOpen: boolean): void {
    this.loggingInSource.next(isOpen);
  }

  toggleToRegister(): void {
    this.showSignUpModal(true);
    this.showLoginModal(false);
  }

  toggleToLogin(): void {
    this.showLoginModal(true);
    this.showSignUpModal(false);
  }

}
