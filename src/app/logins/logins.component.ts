import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ServicioMarketService } from '../servicio-market.service';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent implements OnInit {

  token: any = []; //token
  rol: any = []; //rol, verificar en middleware usuario

  LogginGCliente = new FormGroup(
    {
      textUser: new FormControl(),
      textPass: new FormControl()
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioMarketService,
      Router: Router
    ) { }

  //Insertar un cliente
  public LoggearCliente() {

    var datosvalor1 = this.LogginGCliente.getRawValue()['textUser'];
    var datosvalor2 = this.LogginGCliente.getRawValue()['textPass'];
    var cadena = {
      "nickname_us": datosvalor1, "contrasena_us": datosvalor2
    };

    this.servi.Login(cadena).subscribe((data: {}) => {
      var valor = JSON.stringify(data);
      //this.token = valor.substring(10, 199);
      this.token = valor.substring(10, 199);
      //this.servi.guardarToken(this.token);
      this.guardarToken(this.token);
      //localStorage.getItem("session_us")
      //alert(this.token);
      //localStorage.setItem("session_us", this.token);
      //this.cookieService.set(cookie,this.token)
    }, error => { console.log(error) });
    this.LogginGCliente.reset();
  }

  guardarToken(token: any) {
    this.servi.guardarToken(this.token);
    //localStorage.setItem("session_us", token);
  }

  leerToken() {
    localStorage.getItem("token");
  }

  public getRol() {
    this.servi.getRol().subscribe((data: any) => {
      this.rol = JSON.stringify(data);
    });
  }

  public CerrarSesion() {
    localStorage.removeItem("token");
  }

  ngOnInit(): void {
  }

}
