import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { AdminComponent } from './usuario/admin/admin.component';
import { UserComponent } from './usuario/user/user.component';
import { ToolbarModule } from 'primeng/toolbar'; 
import { AdminMascotasComponent } from './usuario/admin/admin-mascotas/admin-mascotas.component';
import { AdminUsuarioComponent } from './usuario/admin/admin-usuario/admin-usuario.component';
import { AdminAnunciosComponent } from './usuario/admin/admin-anuncios/admin-anuncios.component';
import {CardModule} from 'primeng/card';
import { HeaderAdminComponent } from './usuario/admin/header-admin/header-admin.component';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { DataViewModule } from 'primeng/dataview';
import { RegistroComponent } from './auth/registro/registro.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { HeaderUsuarioComponent } from './usuario/user/header-usuario/header-usuario.component';
import { PaseoComponent } from './usuario/user/anuncio/paseo/paseo.component';
import { CuidadoComponent } from './usuario/user/anuncio/cuidado/cuidado.component';
import { EntrenamientoComponent } from './usuario/user/anuncio/entrenamiento/entrenamiento.component';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { MascotaComponent } from './usuario/user/mascota/mascota/mascota.component';
import { PerfilComponent } from './usuario/user/perfil/perfil.component';
import { CrearAnuncioComponent } from './usuario/user/anuncio/crear-anuncio/crear-anuncio.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import {  DataViewLayoutOptions } from 'primeng/dataview';
import { ListboxModule } from 'primeng/listbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { MisAnunciosComponent } from './usuario/user/anuncio/mis-anuncios/mis-anuncios.component';
import { MisReservasComponent } from './usuario/user/anuncio/mis-reservas/mis-reservas.component';
import { AnadirMascotaComponent } from './usuario/user/mascota/anadir-mascota/anadir-mascota.component';
import { MisTrabajosComponent } from './usuario/user/anuncio/mis-trabajos/mis-trabajos.component';
import { SidebarAnuncioComponent } from './usuario/user/sidebar-anuncio/sidebar-anuncio.component';
import { TreeTableModule } from 'primeng/treetable';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { ModalEditarMascotaComponent } from './usuario/user/mascota/mascota/modal-editar-mascota/modal-editar-mascota.component';
import { DialogModule } from 'primeng/dialog';
import { formatDate } from '@angular/common';
import { FooterComponent } from './usuario/user/footer/footer.component';
import { ModalEditarPerfilComponent } from './usuario/user/perfil/modal-editar-perfil/modal-editar-perfil.component';
import { ModalAdminUsuarioComponent } from './usuario/admin/admin-usuario/modal-admin-usuario/modal-admin-usuario.component';
import { AdminAnadirUsuarioComponent } from './usuario/admin/admin-usuario/admin-anadir-usuario/admin-anadir-usuario.component';
import { AdminAnadirAnuncioComponent } from './usuario/admin/admin-anuncios/admin-anadir-anuncio/admin-anadir-anuncio.component';
import { ModalAdminMascotaComponent } from './usuario/admin/admin-mascotas/modal-admin-mascota/modal-admin-mascota.component';
import { AdminAnadirMascotasComponent } from './usuario/admin/admin-mascotas/admin-anadir-mascotas/admin-anadir-mascotas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    AdminMascotasComponent,
    AdminUsuarioComponent,
    AdminAnunciosComponent,
    HeaderAdminComponent,
    RegistroComponent,
    HeaderUsuarioComponent,
    PaseoComponent,
    CuidadoComponent,
    EntrenamientoComponent,
    MascotaComponent,
    PerfilComponent,
    CrearAnuncioComponent,
    SidebarAnuncioComponent,
    MisAnunciosComponent,
    MisReservasComponent,
    AnadirMascotaComponent,
    MisTrabajosComponent,
    ModalEditarMascotaComponent,
    FooterComponent,
    ModalEditarPerfilComponent,
    ModalAdminUsuarioComponent,
    AdminAnadirUsuarioComponent,
    AdminAnadirAnuncioComponent,
    ModalAdminMascotaComponent,
    AdminAnadirMascotasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule,
    ToolbarModule,
    CardModule,
    TableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    DataViewModule,
    InputTextareaModule,
    FileUploadModule,
    MenuModule,
    PanelModule,
    StyleClassModule,
    DividerModule,
    AvatarGroupModule,
    AvatarModule,
    DataViewModule,
    ListboxModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    PaginatorModule,
    SidebarModule,
    TreeTableModule,
    BreadcrumbModule,
    RippleModule,
    TagModule,
    CalendarModule,
    DialogModule
    
   
  ],
  providers: [MessageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  MessageService,
  ConfirmationService,
  PrimeNGConfig,

   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
