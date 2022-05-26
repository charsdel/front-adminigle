import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news : any  
 

  private apiWpUrl = 'http://wordpress/wp-json/wp/v2/posts';


  constructor(private http: HttpClient) { }

  getAllNews(){

     return this.http.get<any>(this.apiWpUrl)
  }
}
