import { Component } from '@angular/core';
import { UsuarioService } from '../../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/models';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-usuario',
  templateUrl: './header-usuario.component.html',
  styleUrls: ['./header-usuario.component.css']
})
export class HeaderUsuarioComponent {

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
        routerLink: ['/usuario']
      },
      {
        label: 'Servicios',
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Paseo',
            routerLink: ['/usuario/paseo']
          },
          {
            label: 'Cuidado',
            routerLink: ['/usuario/cuidado']
          },
          {
            label: 'Entrenamiento',
            routerLink: ['/usuario/entrenamiento']
          }
        ]
      },
     
      {
        label: 'Crear Anuncio',
        icon: 'pi pi-plus',
        routerLink: ['/usuario/crearAnuncio']
      },
      {
        label: this.getNombre(), 
        icon: 'pi pi-user',
        items: [
          {
            label: 'Mi perfil',
            icon: 'pi pi-user-edit',
            routerLink: ['/usuario/perfil']
          },
          {label: 'Panel de control',
          icon: 'pi pi-cog',
          items: [
            {
              label: 'Mis anuncios',
              icon: 'pi pi-list',
              routerLink: ['/usuario/misanuncios']
            },
            {
              label: 'Mis reservas',
              icon: 'pi pi-calendar',
              routerLink: ['/usuario/misreservas']
            },
            {
              label: 'Mis trabajos',
              icon: 'pi pi-briefcase',
              routerLink: ['/usuario/mistrabajos']
            },
            {
              label: 'Mis mascotas',
              icon: 'pi pi-heart',
              routerLink: ['/usuario/mismascotas']
            }
          ]
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
          }
        ]
      }, 
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
