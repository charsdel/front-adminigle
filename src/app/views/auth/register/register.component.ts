import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';

import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {



  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl('')

      
  });




  errors: any = null;
  constructor(
    private notifyService : NotificationService,

    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
    
  ) {
   
  }
  
 
  ngOnInit() {

    this.registerForm = this.fb.group({
      
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required] ]
      },{
        //llamada a la funcion de validacion parea campos de conytrase#A
        validators:this.Mustmatch('password','password_confirmation')
      }
      
    
    );
  }

  onSubmit() {
    //console.log(this.registerForm.value)

   
    this.authService.register(this.registerForm.value).subscribe(
      (response: any) => {
        //console.log(response.data)
        //this.registerForm.reset();
        //this.router.navigate(['login']);
        this.notifyService.showSuccess("Registro Exitoso", "IgleAdmin.com")
        this.router.navigate(['admin']);
      
      },(error) => {                              //Error callback
        this.notifyService.showError("Error de Registro", "IgleAdmin.com")

        }
      
      );

  }

  //para poner un alias al formulario
  get f() { return this.registerForm.controls; }

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
