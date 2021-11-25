import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let request = req;

    if (token) {
      alert('Logeado');
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    } else {
      history.forward();
    }

    return next.handle(request);
  }
}
