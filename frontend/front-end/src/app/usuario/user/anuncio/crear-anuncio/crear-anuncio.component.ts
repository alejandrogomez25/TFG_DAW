import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AnuncioService } from 'src/app/usuario/anuncio.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Anuncio, Usuario } from 'src/models';

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.css']
})
export class CrearAnuncioComponent implements OnInit {
  tiposAnuncio = ['cuidado', 'paseo', 'entrenamiento'];
  usuario: Usuario | null = null;
  
  minDate: Date = new Date();
  FormValid = true;

  nuevoAnuncio: Anuncio | any = {
    tipo_anuncio: '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    descripcion: '',
    autor: null,
    usuarioReserva: null,
    precio: null
  };

  constructor(
    private anuncioService: AnuncioService,
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {


  }

  onSubmit(): void {
    this.usuario = this.usuarioService.getUserData();
    if (this.usuario) {
      this.nuevoAnuncio.autor = this.usuario; 
      this.nuevoAnuncio.usuarioReserva = null;

      this.anuncioService.saveAnuncio(this.nuevoAnuncio).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Anuncio Creado', detail: 'El anuncio ha sido creado con éxito.' });
          setTimeout(() => {          
            this.router.navigate(['/usuario/misanuncios']);
          }, 1000);
          console.log('Anuncio creado:', res);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al crear el anuncio.' });
          console.log('Error al crear anuncio:', this.nuevoAnuncio, err);
        }
      });
    }
  }

  validarHora(): void {
    if (this.nuevoAnuncio.hora_inicio && this.nuevoAnuncio.hora_fin) {
      this.FormValid = this.nuevoAnuncio.hora_fin > this.nuevoAnuncio.hora_inicio;
      if (!this.FormValid) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La hora fin no puede ser menor que la hora de inicio.' });
      }
    }
  }
}
