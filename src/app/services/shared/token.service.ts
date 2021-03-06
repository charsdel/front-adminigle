import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: 'http://admini/api/login',
    register: 'http://admini/api/register',
  };
  constructor() {}

  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  //para almacenar el token de Word press local storage

  handleDataWp(token: any) {
    localStorage.setItem('auth_token_wp', token);
  }

  
  getTokenWp() {
    return localStorage.getItem('auth_token_wp');
  }

 

  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {

      return(true)

      //revisar esta autenticacion del token
      /*const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }*/
    } else {
      return false;
    }
  
  }

  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }

  removeTokenWp() {
    localStorage.removeItem('auth_token_wp');
  }
}