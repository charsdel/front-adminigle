import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {


  /*
  private apiForgotPassword = 'http://admini/api/forgot-password';
  private apiResetPassword = 'http://admini/api/reset-password';
  */

  private apiForgotPassword = 'https://admini.igleadmin.com/api/forgot-password';
  private apiResetPassword = 'https://admini.igleadmin.com/api/reset-password';


  constructor(private http: HttpClient) { }



  sendEmail (email: String){

    console.log(email)
    //const body = { email: email} 
    
    return this.http.post<any>(this.apiForgotPassword,email);
  }


  sendResetInfo (data: any, token: String){

    //console.log(data)
    //const body = { email: email} 

    //PARA ASIGNAR UN HEADER A UNA PETICION POST 
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    const headers = { 'Authorization': 'Bearer '+token, 'Content-Type': 'application/json' };
    */
    data['token'] = token
    console.log(data)
    return this.http.post<any>(this.apiResetPassword,data);
  }



}
