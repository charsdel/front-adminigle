import { Component, OnInit, Input } from '@angular/core';
import { MembersService } from '../../../services/members.service';
import { Member } from '../../../models/member.model';
import { NotificationService } from '../../../services/notification.service';



@Component({
  selector: 'app-profile-save',
  templateUrl: './profile-save.component.html',
  styleUrls: ['./profile-save.component.scss']
})
export class ProfileSaveComponent implements OnInit {


  @Input() member : Member = {

    memberId : 1,
    name: '',
    last_name: '',
    born: '',
    adress: '',
    status: 'Activo',
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
    approvedDiscipleship: '',
    baptized: ''

  }

  sedes: Array<any> = [];  
  nets : Array<any> = []
  selectedNets: Array<any> = []
  selectedHomes: Array<any> = []

  homes: Array<any> = []

  url: any; //Angular 11, for stricter type
	msg = "";
  filedata:any;
  image:any

  constructor(private membersService: MembersService,private notifyService : NotificationService) {
  }

  ngOnInit(): void {

    this.url = 'assets/img/users-picture/avatar.png'

    this.membersService.get_sedes_nets_homes().subscribe
    ((response: any) => {

      console.log(response);
      this.sedes = response['sedes'];
      this.nets = response['nets'];
      this.homes = response['homes']; 
 
    });

  }


  showPreview(event: any) {
    
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

    var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
    this.filedata = event.target.files[0];

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
      console.log(this.url)
		}

    //console.log(this.filedata['name']) 
    
     
  }

  onSave() {
    //console.log(this.member);
    var myFormData = new FormData();


    if(this.filedata != null)
    {
      //console.log(this.filedata['name'])
      this.image = this.filedata['name']; 
      myFormData.append('image', this.filedata);
      this.member['pictureProfile'] = this.image
    /* Image Post Request */

      this.membersService.uploadImageProfile(myFormData);
    }else{
      console.log('no hay imagen')
      this.image = 'avatar.png'; 

    }
    
    const resul = this.membersService.saveMemberInfo (this.member)
    //this.membersService.updateMemberInfo(this.member,this.image);

    console.log(resul)
    if(resul && resul!='')
    {
      this.notifyService.showSuccess("Agregado con Exito", "IgleSoft.com")
    }else{

      console.log(resul)

      this.notifyService.showError("Error al Agregar", "IgleSoft.com")
    }
    
    //headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Accept', 'application/json');
  
  
   
  }

  EnterSubmit(e: { keyCode: number; }){
    if(e.keyCode === 13){
       console.log('guardo cambios de formulario usuario');
    }
  }


  //cuando las sedes cambian en el select se debe buscar las redes que le corresponden
  sedeChange(selectValue: any)
  {

    
    const sedeId = selectValue.target.value;

    this.selectedNets = []
    for (let net of this.nets){

      if (net['sede_id'] == sedeId) {

        this.selectedNets.push(net)
      }
      
    }

    this.member.netId = this.selectedNets[0].id

    return (this.selectedNets)
    
  }

   //cuando las redes cambian en el select se debe buscar las hogares que le corresponden
   netChange(selectValue: any)
   {
 
     
     const netId = selectValue.target.value;
 
     this.selectedHomes = []
     for (let home of this.homes){
 
       if (home['net_id'] == netId) {
 
         this.selectedHomes.push(home)
       }
       
     }
 
     this.member.homeId = this.selectedHomes[0].id
 
     return (this.selectedHomes)
     
   }

}
