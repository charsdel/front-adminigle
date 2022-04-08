import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

//modulo para las peticiones al api
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthInterceptor } from './services/shared/auth.interceptor';



//modulo de paginacion
import { NgxPaginationModule } from 'ngx-pagination';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';






// admin views

import { TablesComponent } from "./views/admin/tables/tables.component";
import { CardProfileComponent } from './components/cards/card-profile/card-profile.component';
import { ProfilesComponent } from './views/admin/profiles/profiles.component';
import { CardPsocialComponent } from './components/cards/card-psocial/card-psocial.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { HeaderStatsComponent } from './components/headers/header-stats/header-stats.component';
import { CardStatsComponent } from './components/cards/card-stats/card-stats/card-stats.component';
import { IndexComponent } from './views/index/index.component';
import { FooterComponent } from './components/footers/footer/footer.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthNavbarComponent } from './components/navbars/auth-navbar/auth-navbar.component';






//fuentes e iconos


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AdminComponent,
    TablesComponent,
    CardProfileComponent,
    ProfilesComponent,
    CardPsocialComponent,
    AdminNavbarComponent,
    HeaderStatsComponent,
    CardStatsComponent,
    IndexComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    AuthNavbarComponent,
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
