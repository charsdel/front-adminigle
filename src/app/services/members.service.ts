import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member.model';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private apiUrl = 'http://admini/api/v1/members';
  private apiSeachUrl = 'http://admini/api/v1/members/search/';
  private apiUrlStatistics = 'http://admini/api/v1/statictis';

  //esta direccion la usare para trar todos los hogares, redes y sedes y evitar llamar a base de datos 
  //tantas veces para cada cosa, la idea es manejar el intercambio de data entre los drops a nivel de codigo
  private apiUrlschemedrops = 'http://admini/api/v1/schemedrops';

  private apiSaveProfileImage = 'http://admini/api/v1/saveimage';




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

  updateMemberInfo (member: Member,image : string){
    if(confirm("Estas seguro de Actualizar este USUARIO")) {

      
      const body = { cedula:member.nationalId,nombres: member.name,profesion: member.profession, status: member.status,
        direccion: member.adress,correo: member.mail,foto: image, telefono: member.phoneNumber,
        edad: member.age, nacionalidad: member.nationality, estado_civil:member.civilStatus, sexo: member.gender,
        fecha_nac: member.born, sede_id: member.sedeId,red_id: member.netId,home_id: member.homeId, ocupacion: member.occupation,
        fecha_nac_esp: member.spiritualBirthDate, iglesia_creyo: member.churchBorn, bautizado	: member.baptized,
        fecha_bautizo: member.christeningDate, iglesia_bautizo_agua: member.churchWaterChristening,
        fecha_aprob_discipulado: member.dicipulateApprovalDate, responsable_discipulado: member.discipleshipTeacher,
        area_servicio_pasado: member.pastServiceArea, area_servicio_actual: member.currentServiceArea,discipulado_aprobado: member.approvedDiscipleship  };


        this.http.put<any>(this.apiUrl + '/' +member.memberId ,body).subscribe(
          data =>{
            this.value = data
            
            //console.log(data)
            
          } 
        );
        return(this.value)

        
    }


  
    
  }


  saveMemberInfo (member: Member){
    if(confirm("Estas seguro de Actualizar este USUARIO")) {

      
      const body = { cedula: member.nationalId,nombres: member.name,profesion: member.profession, status: member.status,
        direccion: member.adress,correo: member.mail,foto: member.pictureProfile, telefono: member.phoneNumber,
        edad: member.age, nacionalidad: member.nationality, estado_civil:member.civilStatus, sexo: member.gender,
        fecha_nac: member.born, sede_id: member.sedeId, red_id: member.netId, home_id: member.homeId, ocupacion: member.occupation,
        fecha_nac_esp: member.spiritualBirthDate, iglesia_creyo: member.churchBorn, bautizado	: member.baptized,
        fecha_bautizo: member.christeningDate, iglesia_bautizo_agua: member.churchWaterChristening,
        fecha_aprob_discipulado: member.dicipulateApprovalDate, responsable_discipulado: member.discipleshipTeacher,
        area_servicio_pasado: member.pastServiceArea, area_servicio_actual: member.currentServiceArea,discipulado_aprobado: member.approvedDiscipleship  };
      



      
    //console.log(body);

      this.http.post<any>(this.apiUrl ,body).subscribe(
        data => {
          this.value = data

          //console.log(data)
        }
        
      );
      return(this.value)
    }
    
  }

  deleteMember (member: Member){

    
    return this.http.delete<any>(this.apiUrl + '/' +member.memberId).subscribe(
      data => this.value = data
    );    
  }

  search (term: String){

    return this.http.get<Member[]>(this.apiSeachUrl + term);


  }

  getMemberStatistics()
  {
    return this.http.get<any>(this.apiUrlStatistics);

  }

  get_sedes_nets_homes()
  {
    return this.http.get<any[]>(this.apiUrlschemedrops);

  }

  uploadImageProfile (data: any){


    this.http.post<any>(this.apiSaveProfileImage, data).subscribe(
      data => {
       //Check success message
       console.log(data);
      });  
  }

    /*
  onSelect(member: Member): void {
     //this.mymember = member;
    //console.log(member) 
    this.mymember.next(member)

  }*/


 
}
