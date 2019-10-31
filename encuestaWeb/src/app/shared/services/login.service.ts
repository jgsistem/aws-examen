import { Injectable } from '@angular/core';
import { HOST_BACKEND, PARAM_USUARIO, REFRESH_TOKEN_NAME, ACCESS_TOKEN_NAME } from '../constants/constantes';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { RenewPasswordFirst } from 'src/app/models/renewPasswordFirst';
import { ChangePassword } from 'src/app/models/changePassword';
import { BasicAccess } from 'src/app/models/basicAccess';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlOauth = `${HOST_BACKEND}/api/security/token`;
  urlLogin = `${HOST_BACKEND}/api/security/login`;
  urlRenewPassword = `${HOST_BACKEND}/api/security/first-reset-password`;
  urlUpdatePassword = `${HOST_BACKEND}/api/security/change-password`;
  urlRefreshToken = `${HOST_BACKEND}/api/security/refresh-token`;
  urlSignOut = `${HOST_BACKEND}/api/security/signout`;

  constructor(
    private http: HttpClient,
    private router: Router)  { }

  login(loginDTO: Login) {
    return this.http.post(`${this.urlLogin}`, loginDTO);
  }

  renewPasswordFirst(updatePassword: RenewPasswordFirst) {
    return this.http.post(`${this.urlRenewPassword}`, updatePassword);
  }

  updatePassword(updatePassword: ChangePassword) {
    return this.http.post(`${this.urlUpdatePassword}`, updatePassword);
  }

  validarToken() {
    return this.http.post(this.urlOauth, '');
  }

  refreshToken() {
    const request = new BasicAccess();
    request.token = sessionStorage.getItem(REFRESH_TOKEN_NAME);
    return this.http.post(this.urlRefreshToken, request);
  }

  cerrarSesion() {
    const request = new BasicAccess();
    request.token = sessionStorage.getItem(ACCESS_TOKEN_NAME);
    this.http.post(this.urlSignOut, request).subscribe((data: any) => {
      console.log(data.body);
    }, (error) => {
      console.log(error);
    });
    sessionStorage.clear();
    console.log('Se borro tokens de storage');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }

  esRoleAdmin() {
    const usuario = JSON.parse(sessionStorage.getItem(PARAM_USUARIO));
    let rpta = false;
    if (usuario != null && usuario.authorities !== null) {
      usuario.authorities.forEach(element => {
        if (element.authority === 'ADMIN' || element.authority === 'ROLE_ADMIN') {
          rpta = true;
        }
      });
    }
    return rpta;
  }
}
