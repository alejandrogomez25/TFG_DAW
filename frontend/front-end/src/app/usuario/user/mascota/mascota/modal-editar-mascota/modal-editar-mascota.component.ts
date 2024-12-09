import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MascotaService } from 'src/app/usuario/mascota.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Mascota, Usuario } from 'src/models';

@Component({
  selector: 'app-modal-editar-mascota',
  templateUrl: './modal-editar-mascota.component.html',
  styleUrls: ['./modal-editar-mascota.component.css']
})
export class ModalEditarMascotaComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter();
  @Input() mascotaSeleccionada: Mascota | null = null;
  @Output() mascotaActualizada = new EventEmitter();

  usuario: Usuario | null = null;

  tiposMascotas = ['Perro', 'Gato', 'Pájaro'];
  razasPorTipo = [
      ['Golden Retriever', 'Labrador Retriever', 'Bulldog', 'Pastor Alemán', 'Boxer', 'Chihuahua', 'Poodle', 'Beagle', 'Dálmata', 'Husky Siberiano'],
      ['Siamés', 'Persa', 'Maine Coon', 'Bengalí', 'Ragdoll', 'British Shorthair', 'Abisinio', 'Sphynx', 'Scottish Fold', 'Birmano'],
      ['Canario', 'Periquito', 'Cacatúa', 'Agapornis', 'Loro', 'Cotorra', 'Jilguero', 'Paloma', 'Tórtola', 'Pavo Real']
  ];
  usuSrv = inject(UsuarioService);
  mascotaService = inject(MascotaService);
  selectedFile: File | null = null;

  ngOnInit(): void {}

  cancelar() {
    this.visible = false;
    this.close.emit();
  }

  guardarCambios() {
    if (this.mascotaSeleccionada && this.mascotaSeleccionada.idMascota) {
      const usuario = this.usuSrv.getUserData();
      if (usuario && usuario.idUsuario !== undefined) {
        this.mascotaSeleccionada.idUsuario = usuario.idUsuario;
      } else {
        console.error('User ID is undefined');
        return;
      }

      this.mascotaService.updateMascotaById(
        this.mascotaSeleccionada.idMascota,
        this.mascotaSeleccionada,
        this.selectedFile!
      ).subscribe(
        (response) => {
          console.log('Mascota actualizada:', response);
          this.visible = false;
          this.close.emit();
          setTimeout(() => {          this.mascotaActualizada.emit();
          }, 1000);
        },
        (error) => {
          console.error('Error al actualizar la mascota:', error);
          console.log('Mascota actualizada:', this.mascotaSeleccionada);

        }
      );
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
