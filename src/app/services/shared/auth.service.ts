import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlRegister = 'http://admini/api/register';
  private apiUrlLogin =  'http://admini/api/login';


  constructor(private http: HttpClient) {}
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.apiUrlRegister, user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, user);
  }

  /*
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }*/
}
