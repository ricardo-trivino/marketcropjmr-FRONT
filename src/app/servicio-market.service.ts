import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem("token") })
};

@Injectable({
  providedIn: 'root'
})

export class ServicioMarketService {

  private Url: string = 'http://localhost:3000';
  //headers = new HttpHeaders(/*{ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.leerToken() }*/);

  constructor(private http: HttpClient) {
    /*this.headers.append("Content-Type", "aplication/json");
    this.headers.append("Authorization", "Bearer " + localStorage.getItem("session_us"));*/
  }

  /*********************************************************************/
  // Método Listar de los Tipos de documentos 
  getTiposDoc(): Observable<any> {

    return this.http.get(this.Url + "/tipodoc", httpOptions);

  }

  // Método mostrar un solo Tipo de documento
  getTipoDoc(id: any): Observable<any> {

    return this.http.get(this.Url + "/tipodoc" + id, httpOptions);

  }

  getExportTiposDoc(): Observable<any> {

    return this.http.get(this.Url + "/tipodoc", httpOptions)/*.pipe(
      map(this.extractData)    
    );*/
  }

  // Método para insertar un nuevo Tipo de documento 
  async insertTipoDoc(TipDocD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipodoc", TipDocD, httpOptions).toPromise()
    });

  }

  // Método para modificar un  Tipo de documento
  async updateTipoDoc(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipodoc", cadena, httpOptions).toPromise()
    });

  }

  /*********************************************************************/
  // Método Listar de los productos
  getProductos(): Observable<any> {

    return this.http.get(this.Url + "/producto", httpOptions);

  }

  //Método para exportar los productos
  getExportProductos(): Observable<any> {

    return this.http.get(this.Url + "/producto", httpOptions);/*.pipe(
      map(this.extractData)
    );*/

  }

  /*********************************************************************/
  // Método para registrar un cliente 
  async insertCliente(ClienteD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/registro/registrarse", ClienteD, httpOptions).toPromise()
    });

  }

  /*********************************************************************/
  // Método iniciar sesión
  Login(LoginD: any): Observable<any> {

    return this.http.post(this.Url + "/auth/login", LoginD, httpOptions);

  }

  guardarToken(token: any) {
    localStorage.setItem("token", token);
    this.leerToken();
  }

  leerToken() {
    var tok = localStorage.getItem("token");
    return tok;
  }

  /*********************************************************************/
  // Método Listar de los usuarios
  getUsuarios(): Observable<any> {

    return this.http.get(this.Url + "/usuario", httpOptions);

  }

  getRol(): Observable<any> {
    return this.http.get(this.Url + "/middlewares/authtoken", httpOptions);
  }

}