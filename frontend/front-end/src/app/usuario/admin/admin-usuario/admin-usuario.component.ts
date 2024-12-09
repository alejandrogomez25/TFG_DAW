import { Component, inject } from '@angular/core';
import { Usuario } from 'src/models';
import { UsuarioService } from '../../usuario.service';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent {
  usuarios: Usuario[] = [];
  pagedUsuarios: Usuario[] = [];
  usuario: Usuario | null = null;
  first = 0;
  rows = 20; 

  usuarioService = inject(UsuarioService);
  displayModal = false;

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsers().subscribe(
      usuarios => {
        console.log(usuarios);
        this.usuarios = usuarios.filter(usuario => usuario.rol === 'usuario');
        this.updatePagedUsuarios();
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  updatePagedUsuarios() {
    const start = this.first;
    const end = this.first + this.rows;
    this.pagedUsuarios = this.usuarios.slice(start, end);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePagedUsuarios();
  }

  editarUsuario(usuario: Usuario) {
    console.log(usuario);
    this.usuario = usuario;
    this.displayModal = true;
    console.log(this.displayModal);
  }

  eliminarUsuario(id: number): void {
    this.usuarioService.deleteUserById(id).subscribe(
      response => {
        console.log(response);
        console.log('Usuario eliminado correctamente');
        this.actualizarPerfil();
      },
      error => {
        console.error('Error al eliminar usuario:', error);
      },
    );
  }

  actualizarPerfil() {
    this.loadUsuarios();
    console.log('Perfil actualizado', this.usuario);
  }
}
