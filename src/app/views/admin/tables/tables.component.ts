import { Component, OnInit } from '@angular/core';

import { Member } from '../../../models/member.model';

import { MembersService } from '../../../services/members.service';
import { Subject } from "rxjs";





@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit{



  
  page :number = 1;
  total: number = 0;
  per_page : number = 0;
  members : Member [] = [];
  links: any;
  meta: any;
 

 
  
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
    
  }

  ngOnInit(): void {

    
    this.getMembersPage ();
  

    this.searchTermStream
      .subscribe((term: string) => {
        this.membersService.search(term).subscribe ((response: any) => {

          console.log(response);
          this.members = response.data;
          this.updateBookings(this.members);
         
    
    
        });
      });
    
  }

  updateBookings(bookings: Member[]) {
    this.members = bookings;
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
