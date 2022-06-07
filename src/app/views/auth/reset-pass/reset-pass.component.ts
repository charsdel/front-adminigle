import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';


import { PasswordService } from '../../../services/shared/password.service'

import { NotificationService } from '../../../services/notification.service';

import { CustomValidators } from '../../../validators/custom-validators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  token!: any;

  resetForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl('')

      
  });

  constructor( 
      public router: Router,

      private fb: FormBuilder,
      private PasswordSevice: PasswordService,
      private notifyService : NotificationService,
      private route: ActivatedRoute
      
    ) {}

  ngOnInit(): void {

    //aqui se llama el token del url
    this.route.queryParams
    .subscribe(params => {
      this.token = params['token'];
    }
  );

    this.resetForm = this.fb.group(
      {
        
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', [Validators.required] ]

      },{
        //llamada a la funcion de validacion parea campos de conytrase#A
        validators:this.Mustmatch('password','password_confirmation')
      }

     
    );
    
  }

  //para poner un alias al formulario
  get f() { return this.resetForm.controls; }



  onSubmit() {
  
    //console.warn(this.resetForm.value);
    
    
    this.PasswordSevice.sendResetInfo(this.resetForm.value,this.token).subscribe(

      (response: any) => {
      
        this.notifyService.showSuccess("Exitoso: su clave ha sido reestablecida ", "IgleAdmin.com")
        this.router.navigate(['auth/login']);

      },(error) => {                              //Error callback
        this.notifyService.showError("Datos o token invalido ", "IgleAdmin.com")

        }

    );
    
   
  }



  //validad campos de contrase#a iguales
  Mustmatch(password: any, password_confirmation: any)
  {
    return(formGroup : FormGroup) =>
    {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[password_confirmation];

      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['Mustmatch']){
        return;
      }

      if(passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({Mustmatch:true})
      }else{
        confirmPasswordControl.setErrors(null);
      }




    }
  }

}
