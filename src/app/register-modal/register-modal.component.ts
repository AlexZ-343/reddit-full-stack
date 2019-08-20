import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupService} from './register-modal.service';
import {ReactiveFormsService} from '../shared/reactive-forms.service';
import {RegisterModalValidator} from './register-modal.validator';
import {LoginService} from '../login/login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegistrationStatus} from './register-modal.interface';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit, OnDestroy {

  showSignUpModal = false;
  signupForm: FormGroup;
  registerStatus: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private loginService: LoginService,
    private signupService: SignupService,
    private reactiveForms: ReactiveFormsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.signingUp$.subscribe((signingUp: boolean) => {
        this.showSignUpModal = signingUp;
      }),
      this.signupService.registerStatus$.subscribe((registerStatus: boolean) => {
        this.registerStatus = registerStatus;
        if (this.registerStatus) {
          // login logic
          this.closeModal();
        } else {

        }
      })
    );
    this.setSignupFormControl();
  }

  setSignupFormControl(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40),
        RegisterModalValidator.checkUsername]),
      password: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(100)])
    });
  }

  formIsValid(target: string): boolean {
    return this[target].valid;
  }

  validateRegister(): void {
    if (this.formIsValid('signupForm')) {
      const formJSON = JSON.stringify(this.signupForm.getRawValue());
      this.signupService.submitRegistration(formJSON);
    } else {
      this.reactiveForms.validateAllFormFields(this.signupForm);
    }
  }

  closeModal(): void {
    this.signupForm.reset();
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
