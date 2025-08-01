import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../user-service';

@Injectable({
  providedIn: 'root',
})
export class NonExistingUserValidator {
  userService = inject(UserService);
  check(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const username = control.value;
      return !this.userService.exists(username) ? null : { userExists: true };
    };
  }
}
