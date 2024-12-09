import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MascotaService } from 'src/app/usuario/mascota.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Mascota, Usuario } from 'src/models';

@Component({
  selector: 'app-anadir-mascota',
  templateUrl: './anadir-mascota.component.html',
  styleUrls: ['./anadir-mascota.component.css']
})
export class AnadirMascotaComponent implements OnInit {
  tiposMascotas = ['Perro', 'Gato', 'Pájaro'];
  razasPorTipo = [
      ['Golden Retriever', 'Labrador Retriever', 'Bulldog', 'Pastor Alemán', 'Boxer', 'Chihuahua', 'Poodle', 'Beagle', 'Dálmata', 'Husky Siberiano'],
      ['Siamés', 'Persa', 'Maine Coon', 'Bengalí', 'Ragdoll', 'British Shorthair', 'Abisinio', 'Sphynx', 'Scottish Fold', 'Birmano'],
      ['Canario', 'Periquito', 'Cacatúa', 'Agapornis', 'Loro', 'Cotorra', 'Jilguero', 'Paloma', 'Tórtola', 'Pavo Real']
  ];

  usuario: Usuario | null = null;

  nuevaMascota: Mascota | any = {
    nombre: '',
    tipo_mascota: '',
    raza: '',
    peso: null,
    foto1: '',
    edad: null,
    sexo: '',
    descripcion: '',
    cuidados: '',
    idUsuario: null 
  };

  tipoMascotaSeleccionada: string = '';
  razaSeleccionada: string = '';

  selectedFile: File | null = null;

  constructor(
    private mascotaService: MascotaService,
    private usuSrv: UsuarioService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.usuario = this.usuSrv.getUserData();
    if (this.usuario) {
      this.nuevaMascota.idUsuario = this.usuario.idUsuario; 
    }
  }

  onTipoMascotaChange(event: any): void {
    this.tipoMascotaSeleccionada = event?.target?.value ?? '';
    this.nuevaMascota.tipo_mascota = this.tipoMascotaSeleccionada;
    this.razaSeleccionada = ''; 
  }

  onRazaChange(event: any): void {
    this.razaSeleccionada = event?.target?.value ?? '';
    this.nuevaMascota.raza = this.razaSeleccionada;
  }

  onFileSelected(event: any): void {
    const file: File = event?.files[0]; 
    if (file) {
      this.selectedFile = file;
    }
  }

  enviar(form: any): void {
    if (form.valid && this.selectedFile) {
      this.mascotaService.saveMascota(this.nuevaMascota, this.selectedFile).subscribe(
        (mascota: Mascota) => {
          console.log('Mascota creada:', mascota);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registrado correctamente' });
          setTimeout(() => {
            this.router.navigate(['/usuario/mismascotas']);
          }, 1500);
        },
        error => {
          console.error('Error al crear mascota:', error);
          this.messageService.add({ severity: 'danger', summary: 'Fallo', detail: 'Error al registrarse' });
          console.error('Error al crear mascota:', form.value, error);
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Fallo', detail: 'Por favor, rellene todos los campos requeridos' });
    }
  }
}
