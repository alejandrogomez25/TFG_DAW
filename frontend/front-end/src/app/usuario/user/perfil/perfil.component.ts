import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Usuario } from 'src/models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userData: any;
  usuario: Usuario | null = null;
  displayModal = false;

  constructor(
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userData = this.usuarioService.getUserData();
    if (this.userData && this.userData.idUsuario) {
      this.usuarioService.getUserById(this.userData.idUsuario).subscribe(
        (usuario) => {
          this.usuario = usuario;
          
          console.log('Usuario obtenido:', this.usuario);
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el idUsuario en userData');
    }
  }

  editarPerfil() {
    this.displayModal = true;
  }

  actualizarPerfil() {
      this.loadUserProfile();
      console.log('Perfil actualizado',this.usuario);
  }
}
