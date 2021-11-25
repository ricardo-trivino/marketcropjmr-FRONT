import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';

import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ServicioMarketService } from '../servicio-market.service';
import { ClienteComponent } from '../cliente/cliente.component';

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
        window.location.reload();
        //alert(this.token);
        //localStorage.setItem("session_us", this.token);
      }, error => { console.log(error) });
      this.LogginGCliente.reset();
    } else {
      alert("Hay campos inválidos")
    }
  }

  guardarToken(token: any) {
    this.servi.guardarToken(this.token);
    //localStorage.setItem("session_us", token);
  }

  leerToken() {
    localStorage.getItem("token");
    //localStorage.getItem("session_us")
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
    //se construye el grupo de formulario y sus controles al iniciar la página
    this.LogginGCliente = this.formBuilder.group(
      {
        textUser: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/],
        textPass: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/],
      });

    //se invoca el servicio para obtener el rol
    this.servi.getRol().subscribe((data: { roles: [] }) => {
      //this.rol = JSON.stringify(data);
      var valor = JSON.stringify(data);
      this.rol = valor.substring(7, 8);
      console.log(this.rol);
      if (this.rol == '1') {
        //alert('Cliente');
        this.router.navigate(['/Cliente']);
      } else if (this.rol = '2') {
        //alert('Administrador');
        this.router.navigate(['/Admin']);
      }
    },
      error => { console.error(error + " ") });
  }

}
