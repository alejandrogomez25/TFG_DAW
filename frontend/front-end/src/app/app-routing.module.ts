import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './usuario/admin/admin.component';
import { UserComponent } from './usuario/user/user.component';
import { AdminAuthGuard } from './helpers/admin-auth.guard';
import { UserAuthGuard } from './helpers/user-auth.guard';
import { AdminAnunciosComponent } from './usuario/admin/admin-anuncios/admin-anuncios.component';
import { AdminMascotasComponent } from './usuario/admin/admin-mascotas/admin-mascotas.component';
import { AdminUsuarioComponent } from './usuario/admin/admin-usuario/admin-usuario.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { EntrenamientoComponent } from './usuario/user/anuncio/entrenamiento/entrenamiento.component';
import { CuidadoComponent } from './usuario/user/anuncio/cuidado/cuidado.component';
import { PaseoComponent } from './usuario/user/anuncio/paseo/paseo.component';
import { MascotaComponent } from './usuario/user/mascota/mascota/mascota.component';
import { CrearAnuncioComponent } from './usuario/user/anuncio/crear-anuncio/crear-anuncio.component';
import { PerfilComponent } from './usuario/user/perfil/perfil.component';
import {AnadirMascotaComponent} from './usuario/user/mascota/anadir-mascota/anadir-mascota.component';
import {MisAnunciosComponent} from './usuario/user/anuncio/mis-anuncios/mis-anuncios.component';
import { MisReservasComponent } from './usuario/user/anuncio/mis-reservas/mis-reservas.component';
import { MisTrabajosComponent } from './usuario/user/anuncio/mis-trabajos/mis-trabajos.component';
import { AdminAnadirUsuarioComponent } from './usuario/admin/admin-usuario/admin-anadir-usuario/admin-anadir-usuario.component';
import { AdminAnadirAnuncioComponent } from './usuario/admin/admin-anuncios/admin-anadir-anuncio/admin-anadir-anuncio.component';
import {AdminAnadirMascotasComponent} from './usuario/admin/admin-mascotas/admin-anadir-mascotas/admin-anadir-mascotas.component';
const routes: Routes = [
  {path:"",component: LoginComponent},
  {path:"login",component:LoginComponent},
  {path: "registro", component: RegistroComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
  {path: 'admin/usuarios', component: AdminUsuarioComponent, canActivate: [AdminAuthGuard] },
  {path: 'admin/mascotas', component: AdminMascotasComponent, canActivate: [AdminAuthGuard] },
  {path: 'admin/anuncios', component: AdminAnunciosComponent, canActivate: [AdminAuthGuard] },
  {path: 'admin/crearUsuario', component: AdminAnadirUsuarioComponent, canActivate: [AdminAuthGuard] },
  {path: 'admin/crearAnuncio', component: AdminAnadirAnuncioComponent, canActivate: [AdminAuthGuard] },
  {path: 'admin/crearMascota', component: AdminAnadirMascotasComponent, canActivate: [AdminAuthGuard] },
  {path: 'usuario', component: UserComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/paseo', component: PaseoComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/cuidado', component: CuidadoComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/entrenamiento', component: EntrenamientoComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/anadir-mascota', component: AnadirMascotaComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/crearAnuncio', component: CrearAnuncioComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/perfil', component:  PerfilComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/mismascotas', component:  MascotaComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/misanuncios', component:  MisAnunciosComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/misreservas', component:  MisReservasComponent, canActivate: [UserAuthGuard] },
  {path: 'usuario/mistrabajos', component:  MisTrabajosComponent, canActivate: [UserAuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
