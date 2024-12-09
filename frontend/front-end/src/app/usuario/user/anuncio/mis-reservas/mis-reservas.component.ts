import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AnuncioService } from 'src/app/usuario/anuncio.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Anuncio } from 'src/models';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent {
  anuncios: Anuncio[] = [];
  anunciosClonados: { [s: string]: Anuncio } = {};
  userData: any; 
  confirmationService = inject(ConfirmationService);
 

  constructor(
    private anuncioService: AnuncioService,
    private messageService: MessageService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.userData = this.usuarioService.getUserData();
    console.log('Usuario:', this.userData);

    if (this.userData && this.userData.idUsuario) {
      this.anuncioService.getAnunciosByUsuarioReserva(this.userData.idUsuario).subscribe(
        (anuncios) => {
          this.anuncios = anuncios;
          console.log('Anuncios:', this.anuncios);
        },
        (error) => {
          console.error('Error al obtener anuncios:', error);
        }
      );
    }
  }

  cancelarReserva(anuncio: Anuncio) {
    console.log
    this.confirmationService.confirm({
      message: `Estás a punto de cancelar la reserva del día ${anuncio.fecha}  con hora de inicio ${anuncio.hora_inicio} y hora de fin ${anuncio.hora_fin}. ¿Estás seguro?`,
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
                    this.messageService.add({ severity: 'success', summary: 'Reservado', detail: 'Reserva cancelada correctamente' });
                    this.recargarPagina();
                },
                error => {
                    console.error('Error al cancelar la reserva:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cancelarr la reserva' });
                }
            );
        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Abortado', detail: 'Operación abortada' });
        }
    });
}
toggleDetails(anuncio: any) {
  anuncio.showDetails = !anuncio.showDetails;
}


  recargarPagina() {
    this.anuncioService.getAnunciosByUsuarioReserva(this.userData.idUsuario).subscribe(
      (anuncios) => {
        this.anuncios = anuncios;
        console.log('Anuncios:', this.anuncios);
      },
      (error) => {
        console.error('Error al obtener anuncios:', error);
      }
    );
  
  }

}
