import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news : any = []
  constructor(private NewsService: NewsService) { }

  ngOnInit(): void {
    this.NewsService.getAllNews().subscribe(
      data => {
        this.news = data;
        console.log(this.news)
        return(this.news)
      });

  //console.log(this.news)


  
  }

  getMembersPage (){

    
   
  }
}
