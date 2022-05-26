import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export class User {
  username!: String;
  email!: String;
  name!: String;
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlRegister = 'http://admini/api/register';
  private apiUrlLogin =  'http://admini/api/login';

  private apiUrlLoginWp =  'http://wordpress/wp-json/jwt-auth/v1/token';


  constructor(private http: HttpClient) {}


  //se hace el proceso de login simultaneo en dos api con el mismo usuario para simular que es una misma

  //registro y login en el api de laravel 
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.apiUrlRegister, user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, user);
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



  //registro y login en el api de worpress  


  /*
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }*/
}
