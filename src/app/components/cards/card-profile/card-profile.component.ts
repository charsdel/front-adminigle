import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { Member } from '../../../models/member.model';

import { MembersService } from '../../../services/members.service';
import { NotificationService } from '../../../services/notification.service';



import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';



@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss']
})
export class CardProfileComponent implements OnInit {


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
  sedes: Array<any> = []
  nets : Array<any> = []
  homes: Array<any> = []
  selectedNets: Array<any> = []
  selectedHomes: Array<any> = []

  

  //subir imagen
  url: any; //Angular 11, for stricter type
	msg = "";

  filedata:any;
  image:any



  
  http: any;

  
  profileForm = new FormGroup({ })

 
 
  constructor(private membersService: MembersService,private notifyService : NotificationService,private fb: FormBuilder) {



    this.profileForm = this.fb.group({
      firstName: [],
      profession: [],
      memberStatus: [],
      nationalId: [],
      adress: [],
      mail: [],
      phone: [],
      age: [],
      nationality: [],
      civilStatus: [],
      gender: [],
      born: [],
      sedeId: [],
      netId: [],
      homeId: [],
      occupation: [],
      spiritualBirthDate: [],
      churchBorn: [],
      baptized: [],
      christeningDate: [],
      churchWaterChristening: [],
      pastServiceArea: [],
      currentServiceArea: [],
      approvedDiscipleship: [],
      dicipulateApprovalDate: [],
      discipleshipTeacher: [],
      studies: this.fb.array([
        this.fb.group({
          materia: [''],
          fecha: [''],
          maestro: ['']      
        })
      ])
  
    })  

    


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
      
      let studiesArray: any = null;
      
      //console.log('hola'+this.member.discipleshipTeacher)

     
      
      if( this.member.discipleshipTeacher!='')
      {


        try {
          studiesArray = JSON.parse(this.member.discipleshipTeacher)
        } catch (e) {
          studiesArray = null
        }
        
        /*if(this.member.discipleshipTeacher.search('/^[{/gi') != -1 )
        {
         

        }*/
      }

      this.profileForm.setValue({
        firstName: this.member.name, 
        profession: this.member.profession,
        memberStatus: this.member.status,
        nationalId: this.member.nationalId,
        adress: this.member.adress,
        mail: this.member.mail,
        phone: this.member.phoneNumber,
        age: this.member.age,
        nationality: this.member.nationality,
        civilStatus: this.member.civilStatus,
        gender: this.member.gender,
        born: this.member.born,
        sedeId: this.member.sedeId,
        netId: this.member.netId,
        homeId: this.member.homeId,
        occupation: this.member.occupation,
        spiritualBirthDate: this.member.spiritualBirthDate,
        churchBorn: this.member.churchBorn,
        baptized: this.member.baptized,
        christeningDate: this.member.christeningDate,
        churchWaterChristening: this.member.churchWaterChristening,
        pastServiceArea: this.member.pastServiceArea,
        currentServiceArea: this.member.currentServiceArea,
        approvedDiscipleship: this.member.approvedDiscipleship,
        dicipulateApprovalDate: this.member.dicipulateApprovalDate,
        discipleshipTeacher: this.member.discipleshipTeacher,
        studies: [{

            materia:'',
            fecha:'',
            maestro:''
        }]

      }); 

      
      if(studiesArray!=null){
        console.log("hola es distinto de null")


        studiesArray.forEach((element: any,index :number) => {
          console.log(index)

          if(index == 0){

              this.studies.setValue( [{

                materia:element.materia,
                fecha:element.fecha,
                maestro:element.maestro
            }])
          }else{

            this.studies.push(
  
              this.fb.group({
                materia: [element.materia],
                fecha: [element.fecha],
                maestro: [element.maestro]
                
              })
               
        
            );

          }
          
        
        });
      
      }

      /*for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
      }*/

      

      
      


    });

    
    //console.log(this.selectedNets)

    
  }


  //[{"materia":"asdasdas","fecha":"2022-06-29","maestro":"asdasdas"},{"materia":"wwwwwwwwwwwwwwww","fecha":"2022-06-23","maestro":"wwwwwwww"}]



  get studies() {
    return this.profileForm.get('studies') as FormArray;
  }
 
  addStudies() {

    

    this.studies.push(

      this.fb.group({
        materia: [''],
        fecha: [''],
        maestro: ['']
        
      })
       

    );


  }

  deleteStudies(index: number) {

    

    this.studies.removeAt(index);


  }
    
  showToasterInfo(){
      this.notifyService.showInfo("This is info", "tutsmake.com")
  }
    
  showToasterWarning(){
      this.notifyService.showWarning("This is warning", "tutsmake.com")
  }
  
  onRegister() {
      //console.warn(this.profileForm.value)
      
      
      var myFormData = new FormData();
      //const headers = new HttpHeaders();


      if(this.filedata != null)
      {
        //console.log(this.filedata['name'])
        this.image = this.filedata['name']; 
        myFormData.append('image', this.filedata);
       //Image Post Request 

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

      //agregar el id al form
      this.profileForm.addControl('memberId', new FormControl(this.member.memberId));

      const resul = this.membersService.updateMemberInfo(this.profileForm.value,this.image);


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
