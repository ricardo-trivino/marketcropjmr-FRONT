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
  rol: any = []; //rol, verificar en middleware usuario

  //Form group 
  ListaProductos = new FormGroup(
    {

    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioMarketService,
      Router: Router,
      private router:Router
    ) { }

  //Consultar todos los tipos de documentos
  public consultaProductos() {
    this.servi.getExportProductos().subscribe((data: any) => {
      //var productos = data;
      this.Productos = data;
    });
  }

  ngOnInit(): void {
    //se invoca el servicio para obtener el rol
    this.servi.getRol().subscribe((data: { roles: [] }) => {
      //this.rol = JSON.stringify(data);
      var valor = JSON.stringify(data);
      this.rol = valor.substring(7, 8);
      //console.log(this.rol);
      if (this.rol == '1') {
        //alert('Cliente');
        this.router.navigate(['/Cliente']);
      } else if (this.rol = '2') {
        //alert('Administrador');
        this.router.navigate(['/Admin']);
      }
    },
      error => { console.error(error + " ") });
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
