import { Component } from '@angular/core';
import { UsuarioService } from '../../usuario/usuario.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/models';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  creds:LoginRequest = {
    email:'',password:''
  }
  constructor(private usuSrv:UsuarioService,
    private router:Router,private messageService:MessageService
  ){
  }

  login(form: NgForm) {
    this.usuSrv.login(this.creds).subscribe(
      response => {
        const usuario = this.usuSrv.getUserData();
        console.log("DATOS :",usuario);
        if (usuario && usuario.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else if (usuario && usuario.rol === 'usuario') {
          this.router.navigate(['/usuario']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el rol del usuario' });
        }
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Inicio de sesión fallido' });
      }
    );
  }



}
