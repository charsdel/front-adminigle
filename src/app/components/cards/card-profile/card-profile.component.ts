import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { Member } from '../../../models/member.model';

import { MembersService } from '../../../services/members.service';
import { NotificationService } from '../../../services/notification.service';

import { HttpHeaders } from '@angular/common/http';





@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss']
})
export class CardProfileComponent implements OnInit {


  toogleEdit : boolean = true;
  
  
  //para hacer e bloqueo individual de campos y el @viewchild es para activar el onfocus en la propiedad y titile el cursor dentro del input
  /*
  inputnationalIdDisabled : boolean = true;
  inputNameDisabled : boolean = true ;inputProfessionDisabled: boolean = true ;inputAdressDisabled : boolean = true; inputSedeDisabled : boolean = true; inputNetDisabled : boolean = true;
  inputHomeDisabled : boolean = true; inputOccupationDisabled : boolean = true; inputMailDisabled : boolean = true;
  inputPhoneDisabled: boolean = true; inputAgeDisabled: boolean = true;inputNationalityDisabled: boolean = true;
  inputCivilsDisabled: boolean = true; inputGenderDisabled: boolean = true; inputBornDisabled : boolean = true;
  inputSpiritualBdDisabled: boolean = true; inputchurchBornDisabled: boolean = true;inputBaptizedDisabled: boolean = true;
  inputchurchWcDisabled: boolean = true;inputBatizedChurchDisabled: boolean = true;inputPastServicesDisabled: boolean = true;
  inputCurrentServiceAreaDisabled: boolean = true; inputholaDisabled : boolean = true;inputchristeningDateDisabled:boolean = true;
  inputapprovedDiscipleshipDisabled: boolean = true; inputdicipulateApprovalDateDisabled : boolean = true; 
  inputdiscipleshipTeacherDisabled: boolean = true;inputMemberStatusDisabled: boolean= true;

  @ViewChild("nationalId") nationalId!: ElementRef;
  @ViewChild("name") name!: ElementRef; @ViewChild("profession") profession!: ElementRef; 
  @ViewChild("adress") adress!: ElementRef;@ViewChild("mail") mail!: ElementRef;
  @ViewChild("phone") phone!: ElementRef;@ViewChild("age") age!: ElementRef;
  @ViewChild("nationality") nationality!: ElementRef;
  
  @ViewChild("churchBorn") churchBorn!: ElementRef; @ViewChild("churchWaterChristening") churchWaterChristening!: ElementRef;
  @ViewChild("pastServiceArea") pastServiceArea!: ElementRef; @ViewChild("currentServiceArea") currentServiceArea!: ElementRef;
  @ViewChild("discipleshipTeacher") discipleshipTeacher!: ElementRef;*/

  value:boolean= true
  sedes: Array<any> = [];  
  nets : Array<any> = []
  selectedNets: Array<any> = []
  selectedHomes: Array<any> = []

  homes: Array<any> = []



  //subir imagen
  url: any; //Angular 11, for stricter type
	msg = "";

  filedata:any;
  image:any



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
    approvedDiscipleship: '',
    baptized: ''

  }
  http: any;

  


 
  constructor(private membersService: MembersService,private notifyService : NotificationService) {

    //cargo la imagen de usurio por defecto
  }
  

  ngOnInit(): void {
    //console.log(this.membersService.get_sedes_nets_homes());

    //asigno una imagen por defecto que tienen el miembro en bd
    this.url = 'assets/img/users-picture/'+this.member.pictureProfile

    //console.log(this.member)
    this.membersService.get_sedes_nets_homes().subscribe
    ((response: any) => {

      //console.log(response);
      this.sedes = response['sedes'];
      this.nets = response['nets'];
      this.homes = response['homes']; 
 
      //console.log(this.nets);
    
      this.selectedNets =  this.setSelectNets(this.member.sedeId,this.nets);
      this.selectedHomes =  this.setSelectHomes(this.member.netId);

      //console.log(this.selectedHomes);

    });

    
    //console.log(this.selectedNets)

    
  }


 
    
    
    showToasterInfo(){
        this.notifyService.showInfo("This is info", "tutsmake.com")
    }
    
    showToasterWarning(){
        this.notifyService.showWarning("This is warning", "tutsmake.com")
    }
  
  onRegister() {
    //console.log(this.member);
    var myFormData = new FormData();
    const headers = new HttpHeaders();


    if(this.filedata != null)
    {
      //console.log(this.filedata['name'])
      this.image = this.filedata['name']; 
      myFormData.append('image', this.filedata);
    /* Image Post Request */

      this.membersService.uploadImageProfile(myFormData);
    }else{
      console.log('no hay imagen')
      if(this.member.pictureProfile == 'avatar.png')
      {
        this.image = 'avatar.png'; 
      }else{
        this.image = this.member.pictureProfile
      }
    }
    



    //console.log(this.image)
    const resul = this.membersService.updateMemberInfo(this.member,this.image);


    console.log(resul)
    if(resul == 'ok')
    {
      this.notifyService.showSuccess("Actualizado con Exito", "IgleSoft.com")
    }else{
      this.notifyService.showError("Error al Actualizar", "IgleSoft.com")
    }

    //headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Accept', 'application/json');
  
  
   
  }

 

  fToggleEdit(){
    this.toogleEdit = !this.toogleEdit;
   

  }


  //disabled individual de las propiedades
  /*
  toggleInput(inputName: String){


    switch(inputName) {

      case "nationalId":{
        this.inputnationalIdDisabled = !this.inputnationalIdDisabled;
        setTimeout(()=>{
          this.name.nativeElement.focus();
        },0);
        break;
      }
      case "name":{
        this.inputNameDisabled = !this.inputNameDisabled;
        setTimeout(()=>{
          this.name.nativeElement.focus();
        },0);
        break;
      }
      case "profession":{
        this.inputProfessionDisabled = !this.inputProfessionDisabled;
        //permite hacer un delay para poner focus al cursor dentro del input titilando listo para editar
        setTimeout(()=>{
        this.profession.nativeElement.focus();
      },0);

        break;
      }
      case "menberStatus":{
        this.inputMemberStatusDisabled = !this.inputMemberStatusDisabled;
      
        break;
      }

      case "adress": { 
        this.inputAdressDisabled = !this.inputAdressDisabled;
        setTimeout(()=>{
          this.adress.nativeElement.focus();
        },0);
       break; 
      } 
      case "mail": { 
        this.inputMailDisabled = !this.inputMailDisabled;
        setTimeout(()=>{
          this.mail.nativeElement.focus();
        },0);
       break; 
      } 
      case "phone": { 
        this.inputPhoneDisabled = !this.inputPhoneDisabled;
        setTimeout(()=>{
          this.phone.nativeElement.focus();
        },0);
       break; 
      } 
      case "age": { 
        this.inputAgeDisabled = !this.inputAgeDisabled;
        setTimeout(()=>{
          this.age.nativeElement.focus();
        },0);
       break; 
      } 
      case "nationality": { 
        this.inputNationalityDisabled = !this.inputNationalityDisabled;
        setTimeout(()=>{
          this.nationality.nativeElement.focus();
        },0)
       break; 
      } 
      case "civilStatus": { 
        this.inputCivilsDisabled = !this.inputCivilsDisabled;
        
       break; 
      } 
      case "gender": { 
        this.inputGenderDisabled = !this.inputGenderDisabled;
        
       break; 
      } 
      case "born": { 
        this.inputBornDisabled = !this.inputBornDisabled;
        
       break; 
      } 
      case "sede": { 
          this.inputSedeDisabled = !this.inputSedeDisabled;
          
         break; 
      } 
      case "net": { 
          this.inputNetDisabled = !this.inputNetDisabled;

         break; 
      } 
      case "home": {
          this.inputHomeDisabled = !this.inputHomeDisabled;

         break;    
      } 
      case "occupation": { 
          this.inputOccupationDisabled = !this.inputOccupationDisabled;
         break; 
      }  

      case "spiritualBD": { 
        this.inputSpiritualBdDisabled = !this.inputSpiritualBdDisabled;
       break; 
      }

      case "churchBorn": { 
        this.inputchurchBornDisabled = !this.inputchurchBornDisabled;
        setTimeout(()=>{
          this.churchBorn.nativeElement.focus();
        },0);
       break; 
      }
      case "baptized": { 
        this.inputBaptizedDisabled = !this.inputBaptizedDisabled;
       break; 
      }

      case "christeningDate": { 
        this.inputchristeningDateDisabled = !this.inputchristeningDateDisabled;
       break; 
      }

      case "churchWaterChristening": { 
        this.inputchurchWcDisabled = !this.inputchurchWcDisabled;
        setTimeout(()=>{
          this.churchWaterChristening.nativeElement.focus();
        },0);
       break; 
      }

      case "pastServices": { 
        this.inputPastServicesDisabled = !this.inputPastServicesDisabled;
        setTimeout(()=>{
          this.pastServiceArea.nativeElement.focus();
        },0);
       break; 
      }

      case "CurrentServiceArea": { 
        this.inputCurrentServiceAreaDisabled = !this.inputCurrentServiceAreaDisabled;
        setTimeout(()=>{
          this.currentServiceArea.nativeElement.focus();
        },0);
       break; 
      }

      case "approvedDiscipleship": { 
        this.inputapprovedDiscipleshipDisabled = !this.inputapprovedDiscipleshipDisabled;
       break; 
      }

      case "dicipulateApprovalDate": { 
        this.inputdicipulateApprovalDateDisabled = !this.inputdicipulateApprovalDateDisabled;
       break; 
      }

      case "discipleshipTeacher": { 
        this.inputdiscipleshipTeacherDisabled = !this.inputdiscipleshipTeacherDisabled;
        setTimeout(()=>{
          this.discipleshipTeacher.nativeElement.focus();
        },0);
       break; 
      }

      default: { 
         console.log("Invalid choice"); 
         break;              
      } 
   }
  }*/

  EnterSubmit(e: { keyCode: number; }){
    if(e.keyCode === 13){
       console.log('guardo cambios de formulario usuario');
    }
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
      //console.log(this.url)
		}

    //console.log(this.filedata['name']) 
    
     
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

  


  //redes que corresponden a la sede del usuario al iniciar la vista de talle
  setSelectNets(sedeId: String,nets: any)
  {

   //console.log(nets)

    for(let net of this.nets){

      //console.log(net['id'])
      //console.log(sedeId)
      if (net['sede_id'] == sedeId) {

        this.selectedNets.push(net)
        //console.log(this.selectedNets);
      }
      
    }

    return (this.selectedNets)
    
  }


   //Hoageres que corresponden a la red del usuario al iniciar la vista detalle
   setSelectHomes(netId: String)
   {
 
    //console.log(this.homes)
 
     for(let home of this.homes){
 
       //console.log(net['id'])
       //console.log(sedeId)
       if (home['net_id'] == netId) {
 
         this.selectedHomes.push(home)
         //console.log(this.selectedNets);
       }
       
     }
 
   // console.log(this.selectedHomes)
     return (this.selectedHomes)
     
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
