import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("session_us") })
};

@Injectable({
  providedIn: 'root'
})
export class ServicioMarketService {

  private Url: string = 'http://localhost:3000';
  //headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    /*this.headers.append("Content-Type", "aplication/json");
    this.headers.append("Authorization", "Bearer " + localStorage.getItem("session_us"));*/
   }

  // Método Listar de los productos
  getProductos(): Observable<any> {

    return this.http.get(this.Url + "/producto", httpOptions /*{headers: this.headers}*/);

  }

  //Método para exportar los productos
  getExportProductos(): Observable<any> {

    return this.http.get(this.Url + "/producto", httpOptions /*{headers: this.headers}*/);/*.pipe(
      map(this.extractData)
    );*/

  }

  // Método para registrar un cliente 
  async insertCliente(ClienteD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/registro/registrarse", ClienteD, httpOptions /*{headers: this.headers}*/).toPromise()
    });

  }

  // Método iniciar sesión
  Login(LoginD: any): Observable<any> {

    return this.http.post(this.Url + "/auth/login", LoginD, httpOptions /*{headers: this.headers}*/);

  }

}