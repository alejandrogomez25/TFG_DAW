export interface Usuario {
    idUsuario?: number;
    nombre: string;
    apellido1?: string;
    apellido2?: string;
    direccion?: string;
    ciudad?: string;
    cp?: number;
    email: string;
    fecha_nacimiento?: Date;
    telefono?: string;
    biografia?: string;
    password: string;
    foto_perfil?: string;
    rol: string;
}

export interface LoginRequest{
    email:string;
    password:string;
}

export interface Anuncio {
    showDetails: any;
    idAnuncio: number;
    tipo: string;
    fecha: Date;
    hora_inicio: string;
    hora_fin: string;
    descripcion: string;
    autor: Usuario;
    usuarioReserva: Usuario | null;
    precio:number;
  }

  export interface Mascota {
    idMascota?: number;
    nombre: string;
    tipo_mascota: string;
    raza: string;
    peso: number;
    foto1: string;
    edad: number;
    sexo: string;
    descripcion: string;
    cuidados: string;
    idUsuario: number;
  }
  