import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { TOKEN_NAME, REFRESH_TOKEN_NAME, ACCESS_TOKEN_NAME, PARAM_USUARIO } from '../shared/constants/constantes';
import { RespuestaApi } from '../models/respuestaApi';
import Swal from 'sweetalert2';
import { RenewPasswordFirst } from '../models/renewPasswordFirst';
import { ChangePassword } from '../models/changePassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private service: LoginService) { }

  ngOnInit() {
    this.iniciarForm();
  }

  iniciarForm() {
      this.form = this.formBuilder.group({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        });
    }

  ingresar() {
    if (this.form.valid) {
        this.service.login(this.form.value).subscribe((data: RespuestaApi) => {
          console.log(data);
          if (data.status === 'OK') {
            sessionStorage.setItem(TOKEN_NAME, data.idToken);
            sessionStorage.setItem(REFRESH_TOKEN_NAME, data.refreshToken);
            sessionStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);
            console.log(sessionStorage.getItem(ACCESS_TOKEN_NAME));
            this.service.validarToken().subscribe((dato: any) => {
              console.log(dato);
              sessionStorage.setItem(PARAM_USUARIO, JSON.stringify(dato.body));
              if (dato.body != null && dato.body.authorities !== null) {
                dato.body.authorities.forEach(element => {
                  if (element.authority === 'USER' || element.authority === 'ROLE_USER') {
                    this.router.navigate(['/encuesta-votar']);
                  } else if(element.authority === 'ADMIN' || element.authority === 'ROLE_ADMIN') {
                    this.router.navigate(['/encuesta-listar']);
                  } else {
                    Swal.fire({
                      type: 'error',
                      title: 'Error',
                      text: 'No tiene permisos'
                    });
                  }
                });
              }
            });
          } else if (data.status === 'OK-UPDATE') {
              Swal.fire({
              title: 'Debe cambiar su contrase&ntilde;a',
              input: 'password',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              showLoaderOnConfirm: true,
              preConfirm: (newPassword) => {
                const datosRenewPassword = new RenewPasswordFirst();
                datosRenewPassword.username = this.form.value.username;
                datosRenewPassword.password = newPassword;
                datosRenewPassword.session = data.sessionId;
                return this.service.renewPasswordFirst(datosRenewPassword).subscribe((resp: RespuestaApi) => {
                  if (resp.status === 'OK') {
                    Swal.fire('Ahora intente ingresar con su nueva clave');
                    return;
                  } else {
                    Swal.fire({
                      type: 'error',
                      title: 'Error',
                      text: data.body
                    });
                  }
                }, (error) => {
                  Swal.showValidationMessage(`Ocurrio un Error al tratar de actualizar su nueva clave: ${error}`);
                });
              }
            });
          } else if (data.status === 'OK-RESET') {
            Swal.mixin({
              input: 'text',
              confirmButtonText: 'Next &rarr;',
              showCancelButton: true,
              progressSteps: ['1', '2']
            }).queue([
              {
                title: 'Verification Code',
                text: 'Ingrese el codigo de verificacion',
                input: 'text'
              },
              {
                title: 'Actualizar password',
                text: 'Actualice su password por favor',
                input: 'password'
              }
            ]).then((result) => {
              if (result.value) {
                const datosChangePassword = new ChangePassword();
                datosChangePassword.verificationCode = result.value[0];
                datosChangePassword.newPassword = result.value[1];
                datosChangePassword.username = this.form.value.username;
                return this.service.updatePassword(datosChangePassword).subscribe((resp: RespuestaApi) => {
                  if (resp.status === 'OK') {
                    Swal.fire('Ahora intente ingresar con su nueva clave (Cierre esta ventana)');
                    return;
                  } else {
                    Swal.fire({
                      type: 'error',
                      title: 'Error',
                      text: 'No se pudo actualizar su clave, intente luego'
                    });
                    return;
                  }
                });
              }
            });
        } else {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: data.body
            });
         }
      });
    }
  }
}
