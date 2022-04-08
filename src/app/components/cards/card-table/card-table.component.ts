import { Component, Input } from '@angular/core';

import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent {

  
  @Input() members: Member = {
    data : [],
     
    pages : 0,
    totalElements : 0 
  };

 

 

}
