import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private usuSrv:UsuarioService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.usuSrv.getToken()) {
      const userData = this.usuSrv.getUserData();
      console.log('UserAuthGuard:', userData?.rol);
      if (userData && userData.rol === 'usuario') {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}