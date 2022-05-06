import { Component, OnInit } from '@angular/core';

import { MembersService } from '../../../services/members.service';


@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.css']
})
export class HeaderStatsComponent implements OnInit {

  headerValue : any = [] ;

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {

    this.membersService.getMemberStatistics().subscribe
    ((response: any) => {

      console.log(response);
      this.headerValue = response;
      console.log(this.headerValue.miembros);

    


    });
  }

}
