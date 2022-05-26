import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";



//vistas
import { TablesComponent } from "./views/admin/tables/tables.component";


//adminviews

import { ProfilesComponent } from "./views/admin/profiles/profiles.component";
import { ProfileSaveComponent} from "./views/admin/profile-save/profile-save.component";


// no layouts views
import { IndexComponent } from "./views/index/index.component";



// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

//noticias 

import { NewsComponent } from './views/news/news.component';


//authguard para redireccionar si no esta logueado 

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [


   // admin views
    {
      path: "admin",
      component: AdminComponent,
      children: [
        { path: "miembros", component: TablesComponent,canActivate: [AuthGuard]},
        { path: "profiles", component: ProfilesComponent,canActivate: [AuthGuard] },
        { path: "nuevo-miembro", component: ProfileSaveComponent,canActivate: [AuthGuard] },
        { path: "news", component: NewsComponent, canActivate: [AuthGuard]},

        { path: "", component: IndexComponent}


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
    }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
