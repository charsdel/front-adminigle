import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TokenService } from '../../services/shared/token.service';
import { AuthStateService } from '../../services/shared/auth-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSignedIn : boolean = false;

  collapseShow = "hidden";
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) {}

  ngOnInit() {

    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });

  }

  

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }


  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}
