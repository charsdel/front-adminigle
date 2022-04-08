import { Component, OnInit,Input } from '@angular/core';

import { Member } from '../../../models/member.model';
import { Data } from '../../../models/data.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() members: Member = {
    data : [],
     
    pages : 0,
    totalElements : 0 
  };

  

  constructor() { }

  ngOnInit(): void {
  }

}
