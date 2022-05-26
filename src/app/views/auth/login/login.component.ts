import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../../../services/shared/token.service';
import { AuthStateService } from '../../../services/shared/auth-state.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors:any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) {
    this.loginForm = this.fb.group({
      username: [],
      password: [],
    });
  }
  ngOnInit() {}
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
        //console.log(response.data)
        this.authState.setAuthState(true);
        
        this.responseHandler(response.data);
        //this.router.navigate(['admin']);
      
      }
    );

    this.router.navigate(['admin']);

  }
  // Handle response
  responseHandler(data:any) {
    console.log(data.token);
    this.token.handleData(data.token);
  }

  responseHandlerWp(data:any) {
    this.token.handleData(data);
  }

}
