import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioMarketService } from '../servicio-market.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  Productos: any = []; //Vector que captura los datos de productos

  //Form group 
  ListaProductos = new FormGroup(
    {

    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioMarketService,
      Router: Router
    ) { }

  //Consultar todos los tipos de documentos
  public consultaProductos() {
    this.servi.getExportProductos().subscribe((data: any) => {
      //var productos = data;
      this.Productos = data;
    });
  }

  ngOnInit(): void {
    this.ListaProductos = this.formBuilder.group(
      {

      });
    //se invoca el servicio y se cargan los productos
    this.servi.getExportProductos().subscribe((data: { productos: [] }) => {
      this.Productos = data;
    },
      error => { console.error(error + " ") });
  }

}
