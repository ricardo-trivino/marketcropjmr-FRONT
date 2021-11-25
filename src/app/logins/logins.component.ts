import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import jwt_decode from "jwt-decode";

import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ServicioMarketService } from '../servicio-market.service';
import { ClienteComponent } from '../cliente/cliente.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
      Router: Router,
      private router: Router
    ) { }

  //Loggear un cliente
  public LoggearCliente() {
    if (this.LogginGCliente.valid) {
      var datosvalor1 = this.LogginGCliente.getRawValue()['textUser'];
      var datosvalor2 = this.LogginGCliente.getRawValue()['textPass'];
      var cadena = {
        "nickname_us": datosvalor1, "contrasena_us": datosvalor2
      };
      this.servi.Login(cadena).subscribe((data: {}) => {
        var valor = JSON.stringify(data);
        this.token = valor.substring(10, 199);
        this.guardarToken(this.token);
        var valor2 = this.token.split(' ')[0]
        var valor3 = this.getDecodedAccessToken(valor2);
        var valor4 = valor3.user[0];
        var rol = valor4.rol_us;
        if (rol == 1) {
          alert('Cliente');
          this.router.navigate(['/Cliente']);
        } else if (rol == 2) {
          alert('Admin');
          this.router.navigate(['/Admin']);
        } else {
          alert('Sin rol');
        }
      }, error => { alert('Datos incorrectos') });
      this.LogginGCliente.reset();
    } else {
      alert("Campos inválidos")
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  guardarToken(token: any) {
    //this.servi.guardarToken(this.token);
    localStorage.setItem("token", token);
  }

  leerToken() {
    localStorage.getItem("token");
  }

  public CerrarSesion() {
    localStorage.removeItem("token");
  }

  ngOnInit(): void {
    this.CerrarSesion();
    //se construye el grupo de formulario y sus controles al iniciar la página
    this.LogginGCliente = this.formBuilder.group(
      {
        textUser: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/],
        textPass: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/],
      });
  }

}
