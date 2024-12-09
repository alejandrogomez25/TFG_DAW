import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AnuncioService } from 'src/app/usuario/anuncio.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Anuncio } from 'src/models';

@Component({
  selector: 'app-mis-trabajos',
  templateUrl: './mis-trabajos.component.html',
  styleUrls: ['./mis-trabajos.component.css']
})
export class MisTrabajosComponent implements OnInit {
  anuncios: Anuncio[] = [];
  userData: any;

  constructor(
    private anuncioService: AnuncioService,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.userData = this.usuarioService.getUserData();
    console.log('Usuario:', this.userData);
    
    if (this.userData && this.userData.idUsuario) {
      this.anuncioService.getAnunciosByAutor(this.userData.idUsuario).subscribe(
        (anuncios) => {
          this.anuncios = anuncios.filter(anuncio => 
            anuncio.autor.idUsuario === this.userData.idUsuario && anuncio.usuarioReserva !== null
          ).map(anuncio => ({ ...anuncio, showDetails: false }));
          
          console.log('Anuncios filtrados:', this.anuncios);
        },
        (error) => {
          console.error('Error al obtener anuncios:', error);
        }
      );
    }
    
  }

cancelarServicio(anuncio: Anuncio) {
  console.log
  this.confirmationService.confirm({
    message: `Estás a punto de cancelarle la reserva a ${anuncio.usuarioReserva?.nombre} el día ${anuncio.fecha}  con hora de inicio ${anuncio.hora_inicio} y hora de fin ${anuncio.hora_fin}. ¿Estás seguro?`,
    header: 'Cancelación de  reserva',
      icon: 'pi pi-calendar-times',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Volver',
      accept: () => {
          if (this.userData) {
              anuncio.usuarioReserva = null;
          }
          this.anuncioService.updateAnuncioById(anuncio.idAnuncio, anuncio).subscribe(
              () => {
                  console.log('Reserva cancelada en:', anuncio);
                  this.messageService.add({ severity: 'success', summary: 'Reservado', detail: 'Reserva eliminada correctamente' });
                  this.recargarPagina();
              },
              error => {
                  console.error('Error al cancelar la reserva:', error);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cancelar la reserva' });
              }
          );
      },
      reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Abortado', detail: 'Operación abortada' });
      }
  });}

  eliminarAnuncio(anuncio: Anuncio) {
    console.log('Eliminar anuncio:', anuncio);
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este anuncio? Esta acción será irreversible y eliminará todo lo relacionado con el anuncio.',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.anuncioService.deleteAnuncioById(anuncio.idAnuncio).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Anuncio eliminado' });
            console.log('Anuncio eliminado:', anuncio.idAnuncio);
            this.recargarPagina();

          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el anuncio' });
            console.log('Anuncio eliminado:', anuncio.idAnuncio);
            console.error('Error al eliminar anuncio:', error);
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Eliminación de anuncio cancelada' });
      }
    });
  }
  

  toggleDetails(anuncio: Anuncio) {
    anuncio.showDetails = !anuncio.showDetails;
  }



  recargarPagina() {
    this.anuncioService.getAnunciosByAutor(this.userData.idUsuario).subscribe(
      (anuncios) => {
        this.anuncios = anuncios.filter(anuncio => 
          anuncio.autor.idUsuario === this.userData.idUsuario && anuncio.usuarioReserva !== null
        ).map(anuncio => ({ ...anuncio, showDetails: false }));
        
        console.log('Anuncios filtrados:', this.anuncios);
      },
      (error) => {
        console.error('Error al obtener anuncios:', error);
      }
    );
  }
}
