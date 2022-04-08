import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../../../models/member.model';
import { MembersService } from '../../../services/members.service';


@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {

  inputAdressDisabled : boolean = true; inputSedeDisabled : boolean = true; inputNetDisabled : boolean = true;
  inputHomeDisabled : boolean = true; inputOccupationDisabled : boolean = true; inputMailDisabled : boolean = true;
  inputPhoneDisabled: boolean = true; inputAgeDisabled: boolean = true;inputNationalityDisabled: boolean = true;
  inputCivilsDisabled: boolean = true; inputGenderDisabled: boolean = true; inputBornDisabled : boolean = true;
  inputSpiritualBdDisabled: boolean = true; inputchurchBornDisabled: boolean = true;inputBaptizedDisabled: boolean = true;
  inputchurchWcDisabled: boolean = true;inputBatizedChurchDisabled: boolean = true;inputPastServicesDisabled: boolean = true;
  inputCurrentServiceAreaDisabled: boolean = true; inputholaDisabled : boolean = true;inputchristeningDateDisabled:boolean = true;
  inputapprovedDiscipleshipsDisabled: boolean = true; inputdicipulateApprovalDateDisabled : boolean = true; 
  inputdiscipleshipTeacherDisabled: boolean = true;

  
  
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
    approvedDiscipleships: false,
    baptized: ''

  }

  


 

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
  }

  
  onRegister() {
    console.log(this.member);
    this.membersService.updateMemberInfo(this.member);
  }

 

  toggleInputAdress(){
    this.inputAdressDisabled = !this.inputAdressDisabled;
  }

  toggleInput(inputName: String){


    switch(inputName) { 
      case "adress": { 
        this.inputAdressDisabled = !this.inputAdressDisabled;
        
       break; 
      } 
      case "mail": { 
        this.inputMailDisabled = !this.inputMailDisabled;
        
       break; 
      } 
      case "phone": { 
        this.inputPhoneDisabled = !this.inputPhoneDisabled;
        
       break; 
      } 
      case "age": { 
        this.inputAgeDisabled = !this.inputAgeDisabled;
        
       break; 
      } 
      case "nationality": { 
        this.inputNationalityDisabled = !this.inputNationalityDisabled;
        
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
       break; 
      }

      case "pastServices": { 
        this.inputPastServicesDisabled = !this.inputPastServicesDisabled;
       break; 
      }

      case "CurrentServiceArea": { 
        this.inputCurrentServiceAreaDisabled = !this.inputCurrentServiceAreaDisabled;
       break; 
      }

      case "approvedDiscipleships": { 
        this.inputapprovedDiscipleshipsDisabled = !this.inputapprovedDiscipleshipsDisabled;
       break; 
      }

      case "dicipulateApprovalDate": { 
        this.inputdicipulateApprovalDateDisabled = !this.inputdicipulateApprovalDateDisabled;
       break; 
      }

      case "discipleshipTeacher": { 
        this.inputdiscipleshipTeacherDisabled = !this.inputdiscipleshipTeacherDisabled;
       break; 
      }

      default: { 
         console.log("Invalid choice"); 
         break;              
      } 
   }
  }

  




}
