import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioMarketService } from '../servicio-market.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

  InsertarGCliente = new FormGroup(
    {
      textTipoDocUs: new FormControl(),
      textNumDocUs: new FormControl(),
      textPNombreUs: new FormControl(),
      textSNombreUs: new FormControl(),
      textPApellidoUs: new FormControl(),
      textSApellidoUs: new FormControl(),
      textContrasenaUs: new FormControl(),
      textNickNameUs: new FormControl()
    });

  constructor
  (
    private formBuilder: FormBuilder,
    private servi: ServicioMarketService,
    Router: Router
  ) { }

    //Insertar un cliente
    public InsertarCliente() {

      var datosvalor1 = this.InsertarGCliente.getRawValue()['textTipoDocUs'];
      var datosvalor2 = this.InsertarGCliente.getRawValue()['textNumDocUs'];
      var datosvalor3 = this.InsertarGCliente.getRawValue()['textPNombreUs'];
      var datosvalor4 = this.InsertarGCliente.getRawValue()['textSNombreUs'];
      var datosvalor5 = this.InsertarGCliente.getRawValue()['textPApellidoUs'];
      var datosvalor6 = this.InsertarGCliente.getRawValue()['textSApellidoUs'];
      var datosvalor7 = this.InsertarGCliente.getRawValue()['textContrasenaUs'];
      var datosvalor8 = this.InsertarGCliente.getRawValue()['textNickNameUs'];
      var cadena = { "tipo_doc_us": datosvalor1, "num_doc_us": datosvalor2, "pnombre_us": datosvalor3, "snombre_us": datosvalor4,
    "papellido_us":datosvalor5, "sapellido_us": datosvalor6, "contrasena_us": datosvalor7, "nickname_us": datosvalor8 };
  
      this.servi.insertCliente(cadena).then
        (res => {
          console.log(res)
        }
        ).catch(err => {
          console.log(err)
        });
      this.InsertarGCliente.reset();
  
    }

  ngOnInit(): void {
  }

}
