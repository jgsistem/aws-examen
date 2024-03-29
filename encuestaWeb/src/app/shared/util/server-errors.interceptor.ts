import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { TOKEN_NAME } from '../constants/constantes';

@Injectable({
  providedIn: 'root',
})
export class ServerErrorsInterceptor implements HttpInterceptor{

  constructor(private serviceSecurity: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem(TOKEN_NAME);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          //no hacemos nada porque todo está ok
        }
      }, err => {
        console.log("err: "+JSON.stringify(err));
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            alert("Ocurri&oacute; un error al validar su token... intente loguearse nuevamente");
            this.serviceSecurity.cerrarSesion();
          }
        }
      })
    );
  }
}
