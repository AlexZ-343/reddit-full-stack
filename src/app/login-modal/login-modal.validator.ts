import {AbstractControl, ValidatorFn} from '@angular/forms';

export class LoginModalValidator {

  static checkUsername(): ValidatorFn {

    // Check whether or not username matches database
    // Check length requirements: 4-40 characters
    // return this.http.get


    // return (control: AbstractControl): { [key: string]: boolean } | null => {
    //   if (control && control.parent) {
    //     if (username.length < 4 || username.length > 40) {
    //       control.parent.controls['username'].setErrors('usernameLength', false);
    //     } else {
    //       return { 'usernameLength', true };
    //     }
    // }
      return null;
    //
    // };
  }

  static checkPassword(): ValidatorFn {
    return null;

  }

}
