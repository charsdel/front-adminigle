import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

  //NO SE USA DEBO APRENDER A USARLO Y REPARARLO
  export const CustomValidators: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return  password?.value !== confirmPassword?.value ? null:{ CustomValidators: true } ;
  };
  