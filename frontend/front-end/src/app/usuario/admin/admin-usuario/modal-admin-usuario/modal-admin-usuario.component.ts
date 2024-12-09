import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Usuario } from 'src/models';

@Component({
  selector: 'app-modal-admin-usuario',
  templateUrl: './modal-admin-usuario.component.html',
  styleUrls: ['./modal-admin-usuario.component.css']
})
export class ModalAdminUsuarioComponent {
  @Input() visible = false; 
  @Output() close = new EventEmitter();
  @Output() perfilActualizado = new EventEmitter();
  @Input() usuarioAux: Usuario | null = null;
  usuario: Usuario |any ;


  

  selectedFile: File | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    console.log('visible en ngOnInit:', this.visible);
    console.log('Usuario en modal:', this.usuarioAux);
   
  }
ngOnChanges(){ if (this.usuarioAux && this.usuarioAux.fecha_nacimiento) {
  this.usuarioAux.fecha_nacimiento = new Date(this.usuarioAux.fecha_nacimiento);
  console.log('Fecha de nacimiento:', this.usuarioAux.fecha_nacimiento);
}}


  guardarCambios() {
    if (this.usuarioAux && this.usuarioAux.idUsuario) {
      this.usuarioService.updateUserById(
        this.usuarioAux.idUsuario,
        this.usuarioAux,
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
    console.log('Usuario en modal1:', this.usuarioAux);
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
