import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioMarketService } from '../servicio-market.service';

@Component({
  selector: 'app-tipos-doc',
  templateUrl: './tipos-doc.component.html',
  styleUrls: ['./tipos-doc.component.css']
})
export class TiposDocComponent implements OnInit {

  TiposDoc: any = []; //Lista de tipos de identificación
  TituloTiposDoc = ""; //Titulo lista de tipos de identificación
  TablaTiposDoc: any = []; //Encabezados tabla lista de tipos de identificación

  TituloTipoDoc = ""; //Titulo del tipo de id buscado
  MiTipoDoc: any = []; //Tipo de identificación buscado
  TabBusTiposDoc: any = []; //Encabezados tabla Tipo de identificación Buscado
  comboListaTipoDoc: any = [];

  title = "Manejo de tipos de documento";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloTipoDocEdit = ""; //Titulo de tipo de identificación a editar
  MiTipoDocE: any = []; //Tipo de identificación a editar
  comboEditarTipoDoc: any = []; //Combo editar tipo de identificación

  //Form group 
  ListaTiposDoc = new FormGroup(
    {

    });
  filtrarTipoDoc = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGTipoDoc = new FormGroup(
    {
      textTipoDoc: new FormControl()
    });
  ActualizarATipoDoc = new FormGroup(
    {
      BuscarIdTipoDoc: new FormControl(),
      textnuevotipodoc: new FormControl(),
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioMarketService,
      Router: Router
    ) { }

  //Consultar todos los tipos de identificación
  public consultaTiposDoc(op: any) {

    if (this.controlLista == 1) {
      this.servi.getTiposDoc().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          console.log(data);
          this.TiposDoc = data;
          this.TituloTiposDoc = "LISTA DE TIPOS DE DOCUMENTO";
          this.TablaTiposDoc[0] = "Indicador";
          this.TablaTiposDoc[1] = "Denominación";
        }
        else if (op == 2) {
          this.comboListaTipoDoc = data;
          this.MiTipoDoc = null;
          this.TituloTipoDoc = "";
          this.TabBusTiposDoc[0] = "";
          this.TabBusTiposDoc[1] = "";
        }
        else if (op == 3) {
          this.comboEditarTipoDoc = data;
          this.MiTipoDocE = null;
          this.TituloTipoDocEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.TiposDoc = null;
      this.TituloTiposDoc = "";
      this.TablaTiposDoc[0] = "";
      this.TablaTiposDoc[1] = "";
      this.controlLista = 1;
    }

  }

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

  }

  //Buscar un tipo de identificación por su id
  public buscarTipoDoc() {

    var filtrovalor = this.filtrarTipoDoc.getRawValue()['combofiltro'];
    this.servi.getTipoDoc('/' + filtrovalor).subscribe((data: {}) => {
      this.MiTipoDoc = data;
      console.log(this.MiTipoDoc);
      this.TituloTipoDoc = "TIPO DE DOCUMENTO SELECCIONADO";
      this.TabBusTiposDoc[0] = "Indicador";
      this.TabBusTiposDoc[1] = "Denominación";
    },
      error => { console.log(error) });

  }

  //Insertar un tipo de identificación
  public InsertarTipoDoc() {

    var datosvalo2 = this.InsertarGTipoDoc.getRawValue()['textTipoDoc'];
    var cadena = { "tipo_doc": datosvalo2 };

    this.servi.insertTipoDoc(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGTipoDoc.reset();

  }

  //Buscar un tipo de documento por su id para editarlo
  buscarEditarTipoDoc() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarATipoDoc.getRawValue()['BuscarIdTipoDoc'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getTipoDoc('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiTipoDocE = data;
      this.TituloTipoDocEdit = "TIPO DE DOCUMENTO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el tipo de identificación 
  public ActualizarTipoDoc() {

    var nuevotipodoc = this.ActualizarATipoDoc.getRawValue()['textnuevotipodoc'];

    var cadena = { "id_tipo_doc": this.BuscarEvalor, "tipo_doc": nuevotipodoc };

    this.servi.updateTipoDoc(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarATipoDoc.reset();

  }

  ngOnInit(): void {

    this.ListaTiposDoc = this.formBuilder.group(
      {

      });
    this.filtrarTipoDoc = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}