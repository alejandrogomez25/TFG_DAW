import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Anuncio } from 'src/models';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.usuarioService.getToken();
    console.log('Token anuncio:', token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  

  getAnuncios(): Observable<Anuncio[]> {
    const headers = this.getHeaders();
    console.log(headers);
    
    return this.http.get<Anuncio[]>("http://localhost:8080/api/anuncio", { headers });
  }

  getAnuncioById(id: number): Observable<Anuncio> {
    const headers = this.getHeaders();
    return this.http.get<Anuncio>(`http://localhost:8080/api/anuncio/${id}`, { headers });
  }

  saveAnuncio(anuncio: Anuncio): Observable<Anuncio> {
    const headers = this.getHeaders();
    return this.http.post<Anuncio>("http://localhost:8080/api/anuncio/createAnuncio", anuncio, { headers });
  }

  updateAnuncioById(id: number, anuncio: Anuncio): Observable<Anuncio> {
    const headers = this.getHeaders();
    return this.http.put<Anuncio>(`http://localhost:8080/api/anuncio/update/${id}`, anuncio, { headers });
  }

  deleteAnuncioById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`http://localhost:8080/api/anuncio/${id}`,  { headers, responseType: 'text' });
  }

  getAnunciosByTipo(tipo: string): Observable<Anuncio[]> {
    const headers = this.getHeaders();
    return this.http.get<Anuncio[]>(`http://localhost:8080/api/anuncio/tipo/${tipo}`, { headers });
  }

  getAnunciosByAutor(id: number): Observable<Anuncio[]> {
    const headers = this.getHeaders();
    return this.http.get<Anuncio[]>(`http://localhost:8080/api/anuncio/autor/${id}`, { headers });
  }

  getAnunciosByUsuarioReserva(id: number): Observable<Anuncio[]> {
    const headers = this.getHeaders();
    return this.http.get<Anuncio[]>(`http://localhost:8080/api/anuncio/usuarioReserva/${id}`, { headers });
  }
}
