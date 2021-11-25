import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let request = req;

    if (token) {
      var valor2 = token.split(' ')[0]
      var valor3 = this.getDecodedAccessToken(valor2);
      var valor4 = valor3.user[0];
      var rol = valor4.rol_us;
      if (rol == 1) {
        //alert('Cliente');
        //alert('Logeado');
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`
          }
        });
      } else if (rol == 2) {
        //alert('Admin');
        //alert('Logeado');
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`
          }
        });
      } else {
        //alert('Sin rol');
        history.forward();
      }

    } else {
      history.forward();
    }

    return next.handle(request);
  }
}
