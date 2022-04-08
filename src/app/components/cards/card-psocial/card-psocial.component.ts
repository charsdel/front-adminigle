import { Component, OnInit,Input } from '@angular/core';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-card-psocial',
  templateUrl: './card-psocial.component.html',
  styleUrls: ['./card-psocial.component.css']
})
export class CardPsocialComponent implements OnInit {

  @Input() member : Member = {

    memberId : 1,
    name: 'carlos',
    last_name: '',
    born: '',
    adress: '',
    status: '',
    nationalId: '',


     //informacion secundaria para mostrar en vista detalle
    gender: '',
    age: '',
    civilStatus: '',
    profession: '',
    nationality: '',
    phoneNumber: '',
    mail: '',
    pictureProfile: '',
    churchBorn: '',
    spiritualBirthDate: '',
    christeningDate: '',
    churchWaterChristening: '',
    dicipulateApprovalDate: '',
    discipleshipTeacher: '',
    pastServiceArea: '',
    currentServiceArea: '',
    sedeId: '',
    sedeName: '',
    netId: '',
    netName: '',
    homeId: '',
    homeName: '',
    occupation: '',
    discipleshipClass: '',
    approvedDiscipleships: false,
    baptized: ''

  } 
  constructor() { }

  ngOnInit(): void {
  }

}
