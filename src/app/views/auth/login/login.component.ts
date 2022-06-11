import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { TokenService } from '../../../services/shared/token.service';
import { AuthStateService } from '../../../services/shared/auth-state.service'

//para los mensajes de notificaciones 
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),

      
  });


  errors:any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private notifyService : NotificationService
  ) {
    
  }
  ngOnInit() {


    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });


  }
  onSubmit() {
    
    //login con worpress lo hace y devuelve token ,pero no la consulta 
    //NOTA: REVISAR LUEGO
    /*
    this.authService.signinWp(this.loginForm.value).subscribe(
     
      (response: any) => {
        console.log(response.token)
        //this.authState.setAuthState(true);
        
        this.responseHandlerWp(response.token);
      
      }
    );*/


      
    this.authService.signin(this.loginForm.value).subscribe(
     
      (response: any) => {
        //console.log(response)
        if(!response.success)
        {
          this.notifyService.showError("Error de Login", "IgleAdmin.com")

          //console.log('entro')
        }else
        {

          this.notifyService.showSuccess("Login Exitoso", "IgleAdmin.com")

          this.authState.setAuthState(true);
        
          this.responseHandler(response.data);
          this.router.navigate(['admin']);

        }

       
      
      }
    );

    //this.router.navigate(['admin']);

  }
  // Handle response
  responseHandler(data:any) {
    //console.log(data.token);
    this.token.handleData(data.token);
  }

  responseHandlerWp(data:any) {
    this.token.handleData(data);
  }

}
