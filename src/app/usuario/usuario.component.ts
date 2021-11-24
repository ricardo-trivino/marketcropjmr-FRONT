import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioMarketService } from '../servicio-market.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  Usuarios: any = []; //Vector que captura los datos de productos
  //Form group 
  ListaUsuarios = new FormGroup(
    {

    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioMarketService,
      Router: Router
    ) { }

  public consultaUsuarios() {
    this.servi.getUsuarios().subscribe((data: any) => {
      this.Usuarios = data;
    },
      error => { console.error(error + " ") });
  }

  ngOnInit(): void {
    this.ListaUsuarios = this.formBuilder.group(
      {

      });
    //se invoca el servicio y se cargan los usuarios
    this.servi.getUsuarios().subscribe((data: { usuarios: [] }) => {
      this.Usuarios = data;
    },
      error => { console.error(error + " ") });
  }

}
