import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";



//vistas
import { TablesComponent } from "./views/admin/tables/tables.component";


//adminviews

import { ProfilesComponent } from "./views/admin/profiles/profiles.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";



// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

const routes: Routes = [


   // admin views
    {
      path: "admin",
      component: AdminComponent,
      children: [
        { path: "tables", component: TablesComponent},
        { path: "profiles", component: ProfilesComponent }
      

      ],


    },
   // auth views
    {
      path: "auth",
      component: AuthComponent,
      children: [
        { path: "login", component: LoginComponent },
        { path: "register", component: RegisterComponent },
       
      ],
    },

    { path: "", component: IndexComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
