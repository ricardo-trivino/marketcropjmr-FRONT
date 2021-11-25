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

  tiposDocumentos: any = []; //Vector que captura la data para el combo de los tipos de documentos
  rol: any = []; //rol, verificar en middleware usuario

  InsertarGCliente = new FormGroup(
    {
      ComboTipoDocPersona: new FormControl(),
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
      Router: Router,
      private router: Router
    ) { }

  //Insertar un cliente
  public InsertarCliente() {
    if (this.InsertarGCliente.valid) {
      console.log(this.InsertarGCliente.value);
      var datosvalor1 = this.InsertarGCliente.getRawValue()['ComboTipoDocPersona'];
      var datosvalor2 = this.InsertarGCliente.getRawValue()['textNumDocUs'];
      var datosvalor3 = this.InsertarGCliente.getRawValue()['textPNombreUs'];
      var datosvalor4 = this.InsertarGCliente.getRawValue()['textSNombreUs'];
      var datosvalor5 = this.InsertarGCliente.getRawValue()['textPApellidoUs'];
      var datosvalor6 = this.InsertarGCliente.getRawValue()['textSApellidoUs'];
      var datosvalor7 = this.InsertarGCliente.getRawValue()['textContrasenaUs'];
      var datosvalor8 = this.InsertarGCliente.getRawValue()['textNickNameUs'];
      var cadena = {
        "tipo_doc_us": datosvalor1, "num_doc_us": datosvalor2, "pnombre_us": datosvalor3, "snombre_us": datosvalor4,
        "papellido_us": datosvalor5, "sapellido_us": datosvalor6, "contrasena_us": datosvalor7, "nickname_us": datosvalor8
      };

      this.servi.insertCliente(cadena).then
        (res => {
          console.log(res);
        }
        ).catch(err => {
          console.log(err);
        });
      this.InsertarGCliente.reset();
      this.router.navigate(['/Cliente']);
      /*this.servi.getRol().subscribe((data: { roles: [] }) => {
        //this.rol = JSON.stringify(data);
        var valor = JSON.stringify(data);
        this.rol = valor.substring(7, 8);
        console.log(this.rol);
        if (this.rol == '1') {
          //alert('Cliente');
          this.router.navigate(['/Cliente']);
        } else if (this.rol = '2') {
          //alert('Administrador');
          this.router.navigate(['/Admin']);
        }
      },
        error => { console.error(error + " ") });*/
      //window.location.reload();
      //this.router.navigate(['/Inicio']);
    } else {
      alert("Hay campos inválidos")
    }
  }

  public CerrarSesion() {
    localStorage.removeItem("token");
  }

  ngOnInit() {
    this.CerrarSesion();
    //se construye el grupo de formulario y sus controles al iniciar la página
    this.InsertarGCliente = this.formBuilder.group(
      {
        ComboTipoDocPersona: ["", Validators.required],
        textNumDocUs: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/],
        textPNombreUs: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/],
        textSNombreUs: ["",],
        textPApellidoUs: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/],
        textSApellidoUs: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/],
        textContrasenaUs: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/],
        textNickNameUs: ["", Validators.required/*, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9_-]{1,15}/)*/]
      });

    //se invoca el servicio y se carga el combobox de los tipos de documentos
    this.servi.getExportTiposDoc().subscribe((data: { tiposdocumentos: [] }) => {
      this.tiposDocumentos = data;
      console.log(this.tiposDocumentos);
    },
      error => { console.error(error + " ") });
  }

}
