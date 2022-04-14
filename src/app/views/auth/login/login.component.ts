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
      email: [],
      password: [],
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
     
      (response: any) => {
        console.log(response.data)
        this.authState.setAuthState(true);
        
        this.responseHandler(response.data);
        this.router.navigate(['admin']);
      
      }
    );
  }
  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data.token);
  }

}
