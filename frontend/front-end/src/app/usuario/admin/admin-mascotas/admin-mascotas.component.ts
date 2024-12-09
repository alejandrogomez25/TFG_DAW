import { Component, inject } from '@angular/core';
import { Mascota } from 'src/models';
import { MascotaService } from '../../mascota.service';

@Component({
  selector: 'app-admin-mascotas',
  templateUrl: './admin-mascotas.component.html',
  styleUrls: ['./admin-mascotas.component.css']
})
export class AdminMascotasComponent {
  mascotas: Mascota[] = [];
  pagedMascotas: Mascota[] = [];
  mascotaSrv = inject(MascotaService);
  displayModal = false;
  mascota: Mascota | null = null;

  first: number = 0;
  rows: number = 10;

  ngOnInit(): void {
    this.loadMascotas();
  }

  loadMascotas(): void {
    this.mascotaSrv.getMascotas().subscribe(
      mascotas => {
        console.log(mascotas);
        this.mascotas = mascotas;
        this.updatePagedMascotas();
      },
      error => {
        console.error('Error al cargar mascotas:', error);
      }
    );
  }

  updatePagedMascotas(): void {
    this.pagedMascotas = this.mascotas.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePagedMascotas();
  }

  editarMascota(mascota: any){
    console.log(mascota);
    this.displayModal = true;
    this.mascota= mascota;
  }

  eliminarMascota(id : number){
    this.mascotaSrv.deleteMascotaById(id).subscribe(
      response => {
        console.log(response);
        console.log('Mascota eliminada correctamente');
        this.loadMascotas();
      },
      error => {
        console.error('Error al eliminar mascota:', error);
      }
    );

  }

}
