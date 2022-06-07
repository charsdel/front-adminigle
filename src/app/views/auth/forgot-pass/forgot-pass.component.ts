import { Component, OnInit } from '@angular/core';


import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';


import { PasswordService } from '../../../services/shared/password.service'

import { NotificationService } from '../../../services/notification.service';




@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {


  forgotForm = new FormGroup({
    email: new FormControl(''),
  });



  constructor( 
    private fb: FormBuilder,
      private PasswordSevice: PasswordService,
      private notifyService : NotificationService,
      
    ) {}

  ngOnInit(): void {

      this.forgotForm = this.fb.group(
      {
        
        email: ['', [Validators.required, Validators.email]],
        
      }
     
    );
  

  }

 

  onSubmit() {
  
    //console.warn(this.forgotForm.value);
    
    this.PasswordSevice.sendEmail(this.forgotForm.value).subscribe(
      
      (response: any) => {
      
        this.notifyService.showSuccess("Exitoso: Revise su bandeja de correo Electronico ", "IgleAdmin.com")
      
      },
      (error) => {                              //Error callback
        //console.error('error caught in component')
        this.notifyService.showError("Email invalido o error de peticion", "IgleAdmin.com")

        //this.loading = false;
  
        //throw error;   //You can also throw the error to a global error handler
      }
     
    );


  }

}
