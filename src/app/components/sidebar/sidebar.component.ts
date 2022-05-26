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
  collapsetopdiv1 = "z-50 relative";
  collapsetopdiv2 = "";

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

    //agego las propiedades por ng class que me permiten hacer blur effect y poner el menu fixed
    this.collapsetopdiv1 = "fixed z-50 inset-0 overflow-y-auto";
    this.collapsetopdiv2 = "fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80";


  }

  toggleCollapseHide(classes: string) {
    this.collapseShow = classes;

    //agego las propiedades por ng class que me permiten hacer blur effect y poner el menu fixed
    this.collapsetopdiv1 = "z-50 relative";

    this.collapsetopdiv2 = "";


  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.token.removeTokenWp();
    this.router.navigate(['/auth/login']);
  }

}
