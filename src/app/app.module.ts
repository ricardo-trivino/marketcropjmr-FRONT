import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Librería para poder consumir el servicio
import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicioMarketService } from './servicio-market.service';

import { AppComponent } from '../app/appcomponent/app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistrosComponent } from './registros/registros.component';
import { LoginsComponent } from './logins/logins.component';
import { AdminComponent } from './admin/admin.component';
import { ClienteComponent } from './cliente/cliente.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos 
    BrowserModule,
    HttpClientModule  // <- Agregar la clase
  ],
  providers: [ServicioMarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

