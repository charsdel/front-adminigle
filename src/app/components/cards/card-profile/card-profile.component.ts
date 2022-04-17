import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { Member } from '../../../models/member.model';
import { MembersService } from '../../../services/members.service';


@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {

  inputNameDisabled : boolean = true ;inputProfessionDisabled: boolean = true ;inputAdressDisabled : boolean = true; inputSedeDisabled : boolean = true; inputNetDisabled : boolean = true;
  inputHomeDisabled : boolean = true; inputOccupationDisabled : boolean = true; inputMailDisabled : boolean = true;
  inputPhoneDisabled: boolean = true; inputAgeDisabled: boolean = true;inputNationalityDisabled: boolean = true;
  inputCivilsDisabled: boolean = true; inputGenderDisabled: boolean = true; inputBornDisabled : boolean = true;
  inputSpiritualBdDisabled: boolean = true; inputchurchBornDisabled: boolean = true;inputBaptizedDisabled: boolean = true;
  inputchurchWcDisabled: boolean = true;inputBatizedChurchDisabled: boolean = true;inputPastServicesDisabled: boolean = true;
  inputCurrentServiceAreaDisabled: boolean = true; inputholaDisabled : boolean = true;inputchristeningDateDisabled:boolean = true;
  inputapprovedDiscipleshipDisabled: boolean = true; inputdicipulateApprovalDateDisabled : boolean = true; 
  inputdiscipleshipTeacherDisabled: boolean = true;inputMemberStatusDisabled: boolean= true;

  @ViewChild("name") name!: ElementRef; @ViewChild("profession") profession!: ElementRef; 
  @ViewChild("adress") adress!: ElementRef;@ViewChild("mail") mail!: ElementRef;
  @ViewChild("phone") phone!: ElementRef;@ViewChild("age") age!: ElementRef;
  @ViewChild("nationality") nationality!: ElementRef;
  
  @ViewChild("churchBorn") churchBorn!: ElementRef; @ViewChild("churchWaterChristening") churchWaterChristening!: ElementRef;
  @ViewChild("pastServiceArea") pastServiceArea!: ElementRef; @ViewChild("currentServiceArea") currentServiceArea!: ElementRef;
  @ViewChild("discipleshipTeacher") discipleshipTeacher!: ElementRef;

  value:boolean= true

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

  


 

  constructor(private membersService: MembersService) { 

  }

  ngOnInit(): void {
  }

  
  onRegister() {
    //console.log(this.member);
    this.membersService.updateMemberInfo(this.member);
  }

 

  toggleInputAdress(){
    this.inputAdressDisabled = !this.inputAdressDisabled;
  }

  toggleInput(inputName: String){


    switch(inputName) {

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
  }

  EnterSubmit(e: { keyCode: number; }){
    if(e.keyCode === 13){
       console.log('guardo cambios de formulario usuario');
    }
 }

  




}
