import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../usuario.service';
import { Usuario } from 'src/models';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
  usuario: Usuario | null = null;

  menuItems: MenuItem[];

  constructor(private usuSrv: UsuarioService, private router: Router) {
    this.menuItems = [];
  }

  ngOnInit(): void {
    this.usuario = this.usuSrv.getUserData();
    this.initializeMenu();
  }

  initializeMenu() {
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: ['/admin']
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  getNombre(): string {
    return this.usuario?.nombre || '';
  }

  logout(): void {
    this.usuSrv.logout();
    this.router.navigate(['/login']);
  }
}
