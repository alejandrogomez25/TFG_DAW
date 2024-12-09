import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AnuncioService } from 'src/app/usuario/anuncio.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Anuncio } from 'src/models';

@Component({
  selector: 'app-mis-anuncios',
  templateUrl: './mis-anuncios.component.html',
  styleUrls: ['./mis-anuncios.component.css']
})
export class MisAnunciosComponent {
  anuncios: Anuncio[] = [];
  anunciosClonados: { [s: string]: Anuncio } = {};
  userData: any; 

  constructor(
    private anuncioService: AnuncioService,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService

  ) {}

  ngOnInit() {
    this.userData = this.usuarioService.getUserData();
    console.log('Usuario: aqui', this.userData);

    if (this.userData && this.userData.idUsuario) {
      this.anuncioService.getAnunciosByAutor(this.userData.idUsuario).subscribe(
        (anuncios) => {
          this.anuncios = anuncios;
        },
        (error) => {
          console.error('Error al obtener anuncios:', error);
        }
      );
    }
  }

  onRowEditInit(anuncio: Anuncio) {
    this.anunciosClonados[anuncio.idAnuncio as unknown as string] = { ...anuncio };
  }

  onRowEditSave(anuncio: Anuncio) {
    if (new Date(anuncio.fecha) < new Date()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha no puede ser anterior a la actual' });
      this.restoreOriginalAnuncio(anuncio);
      return;
    }

    if (anuncio.hora_inicio >= anuncio.hora_fin) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La hora de inicio debe ser menor que la hora de finalización' });
      this.restoreOriginalAnuncio(anuncio);
      return;
    }

    if (anuncio.precio <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Precio inválido' });
      this.restoreOriginalAnuncio(anuncio);
      return;
    }

    this.anuncioService.updateAnuncioById(anuncio.idAnuncio, anuncio).subscribe(
      (anuncioActualizado) => {
        console.log('Anuncio actualizado:', anuncioActualizado);
        delete this.anunciosClonados[anuncio.idAnuncio as unknown as string];
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Anuncio actualizado' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar anuncio' });
      }
    );
  }

  onRowEditCancel(anuncio: Anuncio, index: number) {
    this.anuncios[index] = this.anunciosClonados[anuncio.idAnuncio as unknown as string];
    delete this.anunciosClonados[anuncio.idAnuncio as unknown as string];
  }

  deleteAnuncio(idAnuncio: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este anuncio?',
      accept: () => {
        this.anuncioService.deleteAnuncioById(idAnuncio).subscribe(
          () => {
            this.anuncios = this.anuncios.filter(anuncio => anuncio.idAnuncio !== idAnuncio);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Anuncio eliminado' });
            console.log('Anuncio eliminado:', idAnuncio);
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el anuncio' });
            console.error('Anuncio eliminado:', idAnuncio);
            console.error('Error al eliminar anuncio:', error);
          }
        );
      }
    });
  }
  

  private restoreOriginalAnuncio(anuncio: Anuncio) {
    if (this.anunciosClonados[anuncio.idAnuncio as unknown as string]) {
      this.anuncios[this.anuncios.findIndex(item => item.idAnuncio === anuncio.idAnuncio)] = this.anunciosClonados[anuncio.idAnuncio as unknown as string];
    }
  }
}
