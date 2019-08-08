import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoginService} from '../login/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginModalValidator} from '../login-modal/login-modal.validator';
import {SignupService} from './sign-up-modal.service';
import {ReactiveFormsService} from '../shared/reactive-forms.service';
import {SignUpModalValidator} from './sign-up-modal.validator';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit, OnDestroy {

  showSignUpModal = false;
  signupForm: FormGroup;
  registerStatus: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private loginService: LoginService,
    private signupService: SignupService,
    private reactiveForms: ReactiveFormsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.signingUp$.subscribe((signingUp: boolean) => {
        this.showSignUpModal = signingUp;
      }),
      this.signupService.registerStatus$.subscribe((registerStatus: boolean) => {
        this.registerStatus = registerStatus;
      })
    );
    this.setSignupFormControl();
  }

  setSignupFormControl(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40),
        SignUpModalValidator.checkUsername]),
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
      if (this.registerStatus) {
        this.closeModal();
      } else {
        console.log('Something went wrong');
      }
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
