import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
import {SignupService} from './register-modal.service';

export class RegisterModalValidator {

  // constructor(
  //   private signupService: SignupService
  // ) {}

  static checkUsername(control: FormControl): any {

    // return new Promise(resolve => {
    //
    //   setTimeout(() => {
    //       this.signupService.checkUsername(control.value).subscribe(() => {
    //         resolve(null);
    //       }, () => { resolve({ 'checkUsername': true }); });
    //     }, 1000);
    //   });
    }

  // static validatePassword(password: string): ValidatorFn {
  //   return null;

}
