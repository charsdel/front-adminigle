import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member.model';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private apiUrl = 'http://admini/api/v1/members';
  private apiSeachUrl = 'http://admini/api/v1/members/search/';

  private value='';

 

  //private searchTermStream = new Subject<string>();
/*
  private mymember = new BehaviorSubject <Member>( {

    memberId : 1,
    name: '',
    last_name: '',
    born: '',
    adress: '',
    status: '',
    nationalId: ''

  } );

  mymember$ = this.mymember.asObservable();

*/
  constructor(private http: HttpClient) { }



  getAllMembers(){
    return this.http.get<Member[]>(this.apiUrl);
  }


  getMembersByPage (page: number){

    return this.http.get<Member[]>(this.apiUrl + '?page=' + page);
    
  }

  updateMemberInfo (member: Member){

   const body = { direccion: member.adress,correo: member.mail, telefono: member.phoneNumber,
    edad: member.age, nacionalidad: member.nationality, estado_civil:member.civilStatus, sexo: member.gender,
    fecha_nac: member.born, sede: member.sedeName,red: member.netName, hvn: member.homeName, ocupacion: member.occupation,
    fecha_nac_esp: member.spiritualBirthDate, iglesia_creyo: member.churchBorn, bautizado: member.baptized,
    fecha_bautizo: member.churchWaterChristening, iglesia_bautizo_agua: member.churchWaterChristening,
    fecha_aprob_discipulado: member.dicipulateApprovalDate, responsable_discipulado: member.discipleshipTeacher,
    area_servicio_pasado: member.pastServiceArea, area_servicio_actual: member.currentServiceArea };

    console.log(body);

    return this.http.put<any>(this.apiUrl + '/' +member.memberId ,body).subscribe(
      data => this.value = data
    );
    
  }

  deleteMember (member: Member){

    
    return this.http.delete<any>(this.apiUrl + '/' +member.memberId).subscribe(
      data => this.value = data
    );    
  }

  search (term: String){

    return this.http.get<Member[]>(this.apiSeachUrl + term);


  }

    /*
  onSelect(member: Member): void {
     //this.mymember = member;
    //console.log(member) 
    this.mymember.next(member)

  }*/
}
