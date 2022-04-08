import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../../../models/member.model';

import { MembersService } from '../../../services/members.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {


  /*
  @Input() member : Member = {

    memberId : 1,
    name: 'carlos',
    last_name: '',
    born: '',
    adress: '',
    status: ''

  } */
  constructor(private membersService: MembersService) { }

  ngOnInit(): void {


        //console.log(member.memberId)
    


    

  }

}
