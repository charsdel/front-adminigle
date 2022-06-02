import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

import { DeviceDetectorService } from "ngx-device-detector";


/*
export class User {
  username!: String;
  email!: String;
  name!: String;
  password!: String;
  password_confirmation!: String;
}*/


export class User {
  username!: String;
  email!: String;
  name!: String;
  device_name!: String; 
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //direcciones locales
  /*
  private apiUrlRegister = 'http://admini/api/register';
  private apiUrlLogin =  'http://admini/api/login';

  private apiUrlLoginWp =  'http://wordpress/wp-json/jwt-auth/v1/token';*/
  

  //servidor en bt
  private apiUrlLogin =  'https://admini.igleadmin.com/api/login';

  private apiUrlRegister = 'https://admini.igleadmin.com/api/register';

  private apiUrlLoginWp =  'http://wordpress/wp-json/jwt-auth/v1/token';
  

  constructor(private http: HttpClient,private deviceService: DeviceDetectorService) {}


  //se hace el proceso de login simultaneo en dos api con el mismo usuario para simular que es una misma

  //registro y login en el api de laravel 
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.apiUrlRegister, user);
  }
  // Login
  signin(user: User): Observable<any> {
    user.device_name = this.deviceService.getDeviceInfo().device;
    //console.log(user)
    return this.http.post<any>(this.apiUrlLogin, user)
    //.pipe(catchError(this.handleError));
  }


  //registro y login en el api de laravel 
  // User registration
  registerWp(user: User): Observable<any> {
    return this.http.post(this.apiUrlRegister, user);
  }
  // Login
  signinWp(user: User): Observable<any> {
    //console.log(user.username)
    return this.http.post<any>(this.apiUrlLoginWp,
    {
      username:"charsdel",
      password:"Cinder.91"
    }
    
  );
  }

  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
        return errorMessage;
    });
  }



  //registro y login en el api de worpress  


  /*
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }*/
}
