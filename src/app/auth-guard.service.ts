import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const token = localStorage.getItem('token');

    if (token) {
      var valor2 = token.split(' ')[0]
      var valor3 = this.getDecodedAccessToken(valor2);
      var valor4 = valor3.user[0];
      var rol = valor4.rol_us;
      if (rol == 1) {
        //alert('Cliente');
        //this.router.navigate(['/Cliente']); //Lo enviamos a la página que queramos
        //history.forward();
        return true;
      } else if (rol == 2) {
        //alert('Admin');
        //this.router.navigate(['/Admin']); //Lo enviamos a la página que 
        //history.forward();
        return true;
      } else {
        //alert('Sin rol');
        this.router.navigate(['/Inicio']); //Lo enviamos a la página que queramos
        window.history.forward();
        return false;
      }
    } else {
      this.router.navigate(['/Inicio']); //Lo enviamos a la página que queramos
      window.history.forward();
      return false;
    }
    //return true; //Este camino deja continuar con la vista con normalidad
  }
}
