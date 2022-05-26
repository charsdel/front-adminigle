import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../../services/members.service';
import { Member } from '../../../models/member.model';


@Component({
  selector: 'app-birthday-boys',
  templateUrl: './birthday-boys.component.html',
  styleUrls: ['./birthday-boys.component.css']
})
export class BirthdayBoysComponent implements OnInit {

  constructor(private membersService: MembersService) { }
  members : Array<any> = []


  ngOnInit(): void {

    this.membersService.getBirthdayBoys().subscribe
    ((response: any) => {

      this.members = response;
      console.log(this.members)
    


    });
  }

}
