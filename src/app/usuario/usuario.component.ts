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

  Usuarios: any = []; //Lista de tipos de identificación
  TituloUsuarios = ""; //Titulo lista de tipos de identificación
  TablaUsuarios: any = []; //Encabezados tabla lista de tipos de identificación

  TituloUsuario = ""; //Titulo del tipo de id buscado
  MiUsuario: any = []; //Tipo de identificación buscado
  TabBusUsuario: any = []; //Encabezados tabla Tipo de identificación Buscado
  comboListaUsuario: any = [];

  title = "Manejo de usuarios";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloUsuarioEdit = ""; //Titulo de tipo de identificación a editar
  MiUsuarioE: any = []; //Tipo de identificación a editar
  comboEditarUsuario: any = []; //Combo editar tipo de identificación

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

  //Consultar todos los tipos de identificación
  public consultaUsuarios(op: any) {

    if (this.controlLista == 1) {
      this.servi.getUsuarios().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          console.log(data);
          this.Usuarios = data;
          this.TituloUsuarios = "USUARIOS";
          this.TablaUsuarios[0] = "Indicador";
          this.TablaUsuarios[1] = "Tipo de Documento";
          this.TablaUsuarios[2] = "Número de Documento";
          this.TablaUsuarios[3] = "Primer Nombre";
          this.TablaUsuarios[4] = "Segundo Nombre";
          this.TablaUsuarios[5] = "Primer Apellido";
          this.TablaUsuarios[6] = "Segundo Apellido";
          this.TablaUsuarios[7] = "Contraseña";
          this.TablaUsuarios[8] = "Nickname";
          this.TablaUsuarios[9] = "Rol";
          this.TablaUsuarios[10] = "Estado";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.Usuarios = null;
      this.TituloUsuarios = "";
      this.TablaUsuarios[0] = "";
      this.TablaUsuarios[1] = "";
      this.TablaUsuarios[2] = "";
      this.TablaUsuarios[3] = "";
      this.TablaUsuarios[4] = "";
      this.TablaUsuarios[5] = "";
      this.TablaUsuarios[6] = "";
      this.TablaUsuarios[7] = "";
      this.TablaUsuarios[8] = "";
      this.TablaUsuarios[9] = "";
      this.TablaUsuarios[10] = "";
      this.controlLista = 1;
    }

  }

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

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
