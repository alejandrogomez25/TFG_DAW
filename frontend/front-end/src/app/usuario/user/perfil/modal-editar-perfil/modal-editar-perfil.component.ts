import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Usuario } from 'src/models';

@Component({
  selector: 'app-modal-editar-perfil',
  templateUrl: './modal-editar-perfil.component.html',
  styleUrls: ['./modal-editar-perfil.component.css']
})
export class ModalEditarPerfilComponent implements OnInit {
  @Input() visible = false;
  @Output() close = new EventEmitter();
  @Output() perfilActualizado = new EventEmitter();
  @Input() usuario: Usuario | null = null;
  
  selectedFile: File | null = null;
  userData: any;
  
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.userData = this.usuarioService.getUserData();
    if (this.userData && this.userData.idUsuario) {
      this.usuarioService.getUserById(this.userData.idUsuario).subscribe(
        (usuario) => {
          this.usuario = usuario;
          if (this.usuario && this.usuario.fecha_nacimiento && this.usuario.password) {
            this.usuario.fecha_nacimiento = new Date(this.usuario.fecha_nacimiento);
            this.usuario.password = this.userData.password;
          }
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

  guardarCambios() {
    if (this.usuario && this.usuario.idUsuario) {
      this.usuarioService.updateUserById(
        this.usuario.idUsuario,
        this.usuario,
        this.selectedFile
      ).subscribe(
        (response) => {
          console.log('usuario actualizado:', response);
          this.visible = false;
          this.close.emit();
          setTimeout(() => {          this.perfilActualizado.emit();
          }, 1000);

        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }

  cancelar() {
    console.log('Usuario en modal1:', this.usuario);
    this.visible = false;
    this.close.emit();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Foto onFileSelected:', this.selectedFile);
    }
  }  
}
