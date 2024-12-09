import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Usuario } from 'src/models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  ciudades: string[] = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Bilbao', 'Alicante'];

  constructor(private usuarioService: UsuarioService, private router: Router, private messageService: MessageService) { }

  nuevoUsuario: Usuario |any ={
    nombre: '',
    apellido1: '',
    apellido2: '',
    direccion: '',
    ciudad: '',
    cp: null,
    email: '',
    fecha_nacimiento: null,
    telefono: '',
    biografia: '',
    password: '',
    foto_perfil: '',
    rol: 'usuario'
  };

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  crearUsuario(form: NgForm): void {
    if (form.valid && this.selectedFile) {
      this.usuarioService.saveUser(this.nuevoUsuario, this.selectedFile).subscribe(
        (usuario: Usuario) => {
          console.log('Usuario creado:', usuario);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registrado correctamente' });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error => {
          console.error('Error al crear usuario:',this.nuevoUsuario ,error);
          this.messageService.add({ severity: 'danger', summary: 'Fallo', detail: 'Error al registrarse' });

        }
      );
    }
  }

  formatoFecha(fecha: Date): string {
    return formatDate(fecha, 'yyyy-mm-dd', 'en-US');
  }
}
