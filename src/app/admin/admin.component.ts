import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServicioMarketService } from '../servicio-market.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  title = "Menú de Administrador"
  Productos: any = []; //Vector que captura los datos de productos
  constructor(
    private router: Router,
    private servi: ServicioMarketService
  ) { }

  public CerrarSesion() {
    localStorage.removeItem("token");
    this.router.navigate(['']);
    //history.forward();
  }

  ngOnInit(): void {
    //se invoca el servicio y se cargan los productos
    this.servi.getExportProductos().subscribe((data: { productos: [] }) => {
      this.Productos = data;
    },
      error => { console.error(error + " ") });
  }
}
