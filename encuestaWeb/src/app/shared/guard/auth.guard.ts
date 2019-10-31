import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { TOKEN_NAME } from '../constants/constantes';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private service: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const helper = new JwtHelperService();
        const token = sessionStorage.getItem(TOKEN_NAME);
        console.log(token);
        
        if (!token) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
          return false;
        } else {
          if (!helper.isTokenExpired(token)) {
    
            // /consulta
            // compare si /consulta puede ser accededido por el rol ADMIN
            const decodedToken = helper.decodeToken(token);
            let url = state.url;
    
            // return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) => {
            //   this.menuService.menuCambio.next(data);
    
            //   let cont = 0;
            //   for (let m of data) {
            //     if (url.startsWith(m.url)) {
            //       cont++;
            //       break;
            //     }
            //   }
    
            //   if (cont > 0) {
            //     return true;
            //   } else {
            //     this.router.navigate(['not-401']);
            //     return false;
            //   }
            // }));
            //console.log("no expirado");
            
            return true;
    
          } else {
            //si el token ya expiro
            //console.log("expirado");
            sessionStorage.clear();
            this.router.navigate(['/login']);
            return false;
          }
        }
      }
}
