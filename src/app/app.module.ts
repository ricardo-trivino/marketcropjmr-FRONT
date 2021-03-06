import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// Librería para poder consumir el servicio
import { HttpModule, } from '@angular/http';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicioMarketService } from './servicio-market.service';

// Interceptores
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthGuardService } from './auth-guard.service';

import { AppComponent } from '../app/appcomponent/app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistrosComponent } from './registros/registros.component';
import { LoginsComponent } from './logins/logins.component';
import { AdminComponent } from './admin/admin.component';
import { ClienteComponent } from './cliente/cliente.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { BlogComponent } from './blog/blog.component';
import { WebComponent } from './web/web.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PqrComponent } from './pqr/pqr.component';
import { TiposDocComponent } from './tipos-doc/tipos-doc.component';

//========================================================================
const appRoutes: Routes =
  [
    {
      path: '',
      pathMatch: 'prefix',
      redirectTo: 'Inicio'
    },
    {
      path: 'Inicio',
      component: InicioComponent,
    },
    {
      path: 'Producto',
      component: ProductosComponent,
    },
    {
      path: 'Registro',
      component: RegistrosComponent,
    },
    {
      path: 'Login',
      component: LoginsComponent,
    },
    {
      path: 'Admin',
      component: AdminComponent,
      canActivate: [AuthGuardService] //Acá indicamos cual es el guard y que tipo 
    },
    {
      path: 'Cliente',
      component: ClienteComponent,
      canActivate: [AuthGuardService] //Acá indicamos cual es el guard y que tipo 
    },
    {
      path: 'Usuario',
      component: UsuarioComponent,
      canActivate: [AuthGuardService] //Acá indicamos cual es el guard y que tipo 
    },
    {
      path: 'Nosotros',
      component: NosotrosComponent,
    },
    {
      path: 'Servicios',
      component: ServiciosComponent,
    },
    {
      path: 'Blog',
      component: BlogComponent,
    },
    {
      path: 'Web',
      component: WebComponent,
    },
    {
      path: 'Contacto',
      component: ContactoComponent,
    },
    {
      path: 'Pqr',
      component: PqrComponent,
    },
    {
      path: 'Tip-doc',
      component: TiposDocComponent,
    }
  ]

//========================================================================

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProductosComponent,
    RegistrosComponent,
    LoginsComponent,
    AdminComponent,
    ClienteComponent,
    UsuarioComponent,
    NosotrosComponent,
    ServiciosComponent,
    BlogComponent,
    WebComponent,
    ContactoComponent,
    PqrComponent,
    TiposDocComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos 
    BrowserModule,
    HttpClientModule,  // <- Agregar la clase
  ],
  //providers: [ServicioMarketService],
  providers: [
    ServicioMarketService,
    [AuthGuardService], //Agregamos a los providers el guard
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

