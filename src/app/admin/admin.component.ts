import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  title = "Menú de Administrador"
  constructor(
    private router: Router
  ) { }

  public CerrarSesion() {
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }

  ngOnInit(): void {
  }

}
