import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MascotaService } from 'src/app/usuario/mascota.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Mascota } from 'src/models';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent {
  mascota: Mascota[] = [];
  displayModal = false;
  mascotaSeleccionada: Mascota | null = null;
  mascotaSrv = inject(MascotaService);
  userData: any;

  constructor(
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.reloadPage();
  }

  eliminar(mascota: Mascota) {
    if (mascota.idMascota != null) { 
      this.confirmationService.confirm({
        message: '¿Está seguro que desea eliminar la mascota?',
        accept: () => {
          if (mascota.idMascota != null) { 
            this.mascotaSrv.deleteMascotaById(mascota.idMascota).subscribe(
              () => {
                this.messageService.add({ severity: 'success', summary: 'Mascota eliminada', detail: 'La mascota ha sido eliminada con éxito' });
                this.mascota = this.mascota.filter(m => m.idMascota !== mascota.idMascota);
                this.reloadPage();
              },
              (error) => {
                console.error('Error al eliminar mascota:', error);
                this.messageService.add({ severity: 'error', summary: 'Error al eliminar mascota', detail: 'Ha ocurrido un error al eliminar la mascota' });
              }
            );
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ID de mascota no válido' });
          }
        }
      });

  }}

  reloadPage(){
    this.userData = this.usuarioService.getUserData();
    console.log('Usuario:', this.userData);

    if (this.userData && this.userData.idUsuario) {
      this.mascotaSrv.getMascotas().subscribe(
        (mascotas) => {
          this.mascota = mascotas.filter(mascota => mascota.idUsuario === this.userData.idUsuario);
          console.log('Mascotas:', this.mascota);
        },
        (error) => {
          console.error('Error al obtener mascotas:', error);
        }
      );
    }
  }

  
  showModalDialog() {
    this.displayModal = true;
  }
  
  editar(mascota: Mascota){
    console.log('Editar mascota:', mascota);
    this.mascotaSeleccionada = mascota;
    this.displayModal = true;
  }

  actualizarMascotas() {
    console.log("ACTIVO");
    this.reloadPage();
    
}

  }

