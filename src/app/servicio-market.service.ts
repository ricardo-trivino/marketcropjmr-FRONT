import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServicioMarketService {

  private Url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {
   }

  // Método Listar de los productos
  getProductos(): Observable<any> {

    return this.http.get(this.Url + "/producto", httpOptions);

  }

  //Método para exportar los productos
  getExportProductos(): Observable<any> {

    return this.http.get(this.Url + "/producto", httpOptions)/*.pipe(
      map(this.extractData)
    );*/

  }

  // Método para registrar un cliente 
  async insertCliente(ClienteD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/registro/registrarse", ClienteD, httpOptions).toPromise()
    });

  }

  // Método iniciar sesión
  Login(LoginD: any): Observable<any> {

    return this.http.post(this.Url + "/auth/login", LoginD, httpOptions);

  }

}