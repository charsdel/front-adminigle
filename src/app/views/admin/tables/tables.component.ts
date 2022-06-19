import { Component, OnDestroy, OnInit } from '@angular/core';

import { Member } from '../../../models/member.model';

import { MembersService } from '../../../services/members.service';
import { debounce, debounceTime, distinctUntilChanged, filter, map, Subject, Subscription, tap } from "rxjs";
import { FormControl } from '@angular/forms';





@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy{


  suscription!: Subscription;
  
  page :number = 1;
  total: number = 0;
  per_page : number = 0;
  members : Member [] = [];
  links: any;
  meta: any;
  inputSearch = new FormControl('');
 

 
  
  //miembro seleccionado
  selectedMember?: Member;
 

  private searchTermStream = new Subject<string>();

 


  /*
  members : Member[] = [
    {
      memberId: 1,
      name: 'carlos',
      last_name: 'delgado',
      born: '25-09-91',
      adress: 'los guayos',
      status: 'miembro'
    },
    {
      memberId: 1,
      name: 'maibe',
      last_name: 'delgado',
      born: '11-03-97',
      adress: 'los guayos',
      status: 'miembro'
    }
  ];*/

  
  
  constructor(private membersService: MembersService) { 
    this.inputSearch.valueChanges
    .pipe(//un tunel antes de hacer el suscribe y buscar en l servicio

      //operadores de rexjs
      map((search:string) => search.trim() ), //elimino los espacios
      debounceTime(350),//retrasa la busqueda un tiempo
      distinctUntilChanged(),//valor distinto al anterior
      filter((search:string)=>search !=='')//para que el termino no sea vacio
    )
    .subscribe((res: string) => {
      this.membersService.search(res).subscribe ((response: any) => {

        //console.log(response);
        this.members = response.data;
        //this.updateBookings(this.members);
       
  
  
      });
    });
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  ngOnInit(): void {

    
    this.getMembersPage ();

    this.suscription = this.membersService.refresh$.subscribe(()=>{

      this.getMembersPage();
    }
    
    )
  

    this.searchTermStream
      .subscribe((term: string) => {
        this.membersService.search(term).subscribe ((response: any) => {

          //console.log(response);
          this.members = response.data;
          //this.updateBookings(this.members);
         
    
    
        });
      });


    
  }

  updateBookings(bookings: Member[]) {

    if(confirm("Estas seguro de Actualizar este USUARIO")) {
      this.members = bookings;

    }
  }

  getMembersPage (){

    this.membersService.getMembersByPage(this.page).subscribe
    ((response: any) => {

      //console.log(response);
      this.members = response.data;
      //this.links = response.links;
      //this.meta = response.meta;
      this.total = response.meta.total;
      this.per_page = response.meta.per_page;
     // console.log(this.total);


    });
  } 

  
  pageChangeEvent(event: number){
    this.page = event;
    this.getMembersPage();
  } 


  search(term: string) {
    this.searchTermStream.next(term);
  }

  
  onSelect(member: Member): void {
    this.selectedMember = member;
   //this.selectedHero = hero;

    //this.membersService.onSelect(member);
  }

  onDelete(member: Member): void {

    if(confirm("Estas seguro de Eliminar a "+member.name+' '+member.last_name)) {
      this.membersService.deleteMember(member);
    }
   //this.selectedHero = hero;

    //this.membersService.onSelect(member);
  }


 



  

}
