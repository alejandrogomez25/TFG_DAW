import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AnuncioService } from 'src/app/usuario/anuncio.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Anuncio, Usuario } from 'src/models';
@Component({
  selector: 'app-paseo',
  templateUrl: './paseo.component.html',
  styleUrls: ['./paseo.component.css']
})
export class PaseoComponent {
  anuncios: Anuncio[] = [];
  userData :Usuario | null = null;
  usuario: Usuario | null = null;
usuarioService = inject(UsuarioService);
anuncioService = inject(AnuncioService);
messageService = inject(MessageService);
confirmationService = inject(ConfirmationService);
anunciosMostrados: Anuncio[] = [];
totalAnuncios: number = 0;
paginaActual: number = 1;

selectedCity: string | undefined;
selectedDate: Date | undefined;

  ngOnInit(): void {
    this.anuncioService.getAnunciosByTipo("paseo").subscribe(
      anuncios => {
        console.log('Anuncios:', anuncios);
  
        if (this.userData) {
          this.anuncios = anuncios.filter(anuncio => anuncio.autor.idUsuario !== this.userData?.idUsuario);
        } else {
          this.anuncios = anuncios;
        }
  
        this.totalAnuncios = this.anuncios.length;
        this.paginar({ first: 0, rows: 10 });
      },
      (error) => {
        console.error('Error fetching anuncios:', error, 'Anuncios:', this.anuncios);
      }
    );

   this.userData= this.usuarioService.getUserData();
    console.log('Usuario:', this.userData);
  }    


  reservar(anuncio: Anuncio) {
    this.confirmationService.confirm({
      message: `Estas apunto de reservar el anuncio de ${anuncio.autor.nombre} ${anuncio.autor.apellido1} con hora de inicio ${anuncio.hora_inicio} y hora de fin ${anuncio.hora_fin}  ¿Estás seguro?`,
      header: 'Confirmar reserva',
      icon: 'pi pi-calendar-clock',
      acceptLabel: 'Reservar', 
      rejectLabel: 'Cancelar', 
      accept: () => {
        if (this.userData) {
          anuncio.usuarioReserva = this.userData;
        }
        this.anuncioService.updateAnuncioById(anuncio.idAnuncio, anuncio).subscribe(
          () => {
            console.log('Reserva hecha en:', anuncio);
            this.messageService.add({ severity: 'success', summary: 'Reservado', detail: 'Reserva realizada correctamente' });
              this.reloadPage();
      
          },
          error => {
            console.error('Error al realizar la reserva:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al realizar la reserva' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelada', detail: 'Reserva cancelada' });
      }
      
    });
  }
  reloadPage(){
    this.anuncioService.getAnunciosByTipo("paseo").subscribe(
      anuncios => {
        
        this.anuncios = anuncios;
        console.log('Recarga:', anuncios);
      },
      (error) => {
        console.error('Error fetching anuncios:', error, 'Anuncios:', this.anuncios);
      }
    );
  }  

  paginar(event: any) {
    this.paginaActual = event.page + 1;
    const indInicio = event.first;
    const indFin = indInicio + event.rows;
    this.anunciosMostrados = this.anuncios.slice(indInicio, indFin);
  }
  onCitySelected(city: string) {
    this.selectedCity = city;
    this.filtrarAnuncios();
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.filtrarAnuncios();
  }
  
  filtrarAnuncios() {
    console.log("asdsad");
    let anunciosFiltrados = this.anuncios;

    if (this.selectedCity) {
      anunciosFiltrados = anunciosFiltrados.filter(anuncio => anuncio.autor.ciudad === this.selectedCity);
    }

    if (this.selectedDate) {
      anunciosFiltrados = anunciosFiltrados.filter(anuncio => new Date(anuncio.fecha).toLocaleDateString() === this.selectedDate?.toLocaleDateString());
    }

    this.totalAnuncios = anunciosFiltrados.length;
    this.anunciosMostrados = anunciosFiltrados;
  }
  
  limpiarFiltros() {
    this.selectedCity = undefined;
    this.selectedDate = undefined;
    this.filtrarAnuncios();
  }
}
