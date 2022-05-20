import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      
      username: [''],
      email: [''],
      name: [''],
      password: [''],
      password_confirmation: [''],
    });
  }
  
 
  ngOnInit() {}

  onSubmit() {
    //console.log(this.registerForm.value)

   
    this.authService.register(this.registerForm.value).subscribe(
      (response: any) => {
        console.log(response.data)
        //this.registerForm.reset();
        //this.router.navigate(['login']);
      
      });
  }
 
}
