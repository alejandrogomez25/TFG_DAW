import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

 saveMascota(mascota: Mascota, foto1: File): Observable<Mascota> {
    const headers = this.getHeaders();
    const formData: FormData = new FormData();
    
    formData.append('nombre', mascota.nombre);
    formData.append('tipo_mascota', mascota.tipo_mascota);
    formData.append('raza', mascota.raza);
    formData.append('peso', mascota.peso?.toString() || '');
    formData.append('edad', mascota.edad?.toString() || '');
    formData.append('sexo', mascota.sexo);
    formData.append('descripcion', mascota.descripcion || '');
    formData.append('cuidados', mascota.cuidados || '');
    formData.append('id_usuario', mascota.idUsuario?.toString() || ''); 
    formData.append('foto1', foto1); 
    return this.http.post<Mascota>("http://localhost:8080/api/mascota/createMascota", formData, { headers });
  }

  getMascotas(): Observable<Mascota[]> {
    const headers = this.getHeaders();
    return this.http.get<Mascota[]>("http://localhost:8080/api/mascota", { headers });
  }

  getMascotaById(id: number): Observable<Mascota> {
    const headers = this.getHeaders();
    return this.http.get<Mascota>(`http://localhost:8080/api/mascota/${id}`, { headers });
  }

  updateMascotaById(id: number, mascota: Mascota, file: File): Observable<Mascota> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('nombre', mascota.nombre);
    formData.append('tipo_mascota', mascota.tipo_mascota);
    formData.append('raza', mascota.raza);
    formData.append('peso', mascota.peso.toString());
    formData.append('edad', mascota.edad.toString());
    formData.append('sexo', mascota.sexo);
    formData.append('descripcion', mascota.descripcion);
    formData.append('cuidados', mascota.cuidados);
    formData.append('id_usuario', mascota.idUsuario.toString());

    if (file) {
      formData.append('foto', file);
    }

    return this.http.put<Mascota>(`http://localhost:8080/api/mascota/${id}`, formData, { headers });
  }


 /* updateMascotaById(id: number, mascota: Mascota): Observable<Mascota> {
    const headers = this.getHeaders();
    return this.http.put<Mascota>(`http://localhost:8080/api/mascota/update/${id}`, mascota, { headers });
  }*/

  deleteMascotaById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`http://localhost:8080/api/mascota/${id}`,  { headers, responseType: 'text' });
  }


  getMascotasByIdUsuario(idUsuario: number): Observable<Mascota[]> {
    const headers = this.getHeaders();
    return this.http.get<Mascota[]>(`http://localhost:8080/api/mascotas/usuario/${idUsuario}`, { headers });
}
}
