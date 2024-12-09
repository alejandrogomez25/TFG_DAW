import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, Usuario } from 'src/models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    login(creds: LoginRequest): Observable<any> {
        return this.http.post<any>("http://localhost:8080/api/usuario/login", creds)
            .pipe(map(response => {
                if (response && response.token) {
                    localStorage.setItem("usuario", JSON.stringify(response.usuario)); 
                    localStorage.setItem("token", response.token);
                    return response;
                } else {
                    throw new Error("Token not found in response");
                }
            }));
    }

    getToken(): string | null {
        return localStorage.getItem("token");
    }

    logout(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario"); 
    }

    getUserData(): Usuario | null {
        const usuarioString = localStorage.getItem('usuario');
        return usuarioString ? JSON.parse(usuarioString) : null; 
    }

    getUsers(): Observable<Usuario[]> {
        const headers = this.getHeaders();
        return this.http.get<Usuario[]>("http://localhost:8080/api/usuario", { headers });
    }

    saveUser(user: Usuario, file: File): Observable<Usuario> {
        const headers = this.getHeaders();
        const formData: FormData = new FormData();
        
        formData.append('nombre', user.nombre);
        formData.append('apellido1', user.apellido1 || '');
        formData.append('apellido2', user.apellido2 || '');
        formData.append('direccion', user.direccion || '');
        formData.append('ciudad', user.ciudad || '');
        formData.append('cp', user.cp?.toString() || '');
        formData.append('email', user.email);
        formData.append('fecha_nacimiento', user.fecha_nacimiento?.toISOString().split('T')[0] || '');
        formData.append('telefono', user.telefono || '');
        formData.append('biografia', user.biografia || '');
        formData.append('password', user.password);
        formData.append('file', file);
    
        return this.http.post<Usuario>("http://localhost:8080/api/usuario/createUser", formData, { headers });
    }
    

    /* saveUser(user: Usuario): Observable<Usuario> {
        const headers = this.getHeaders();
        return this.http.post<Usuario>("http://localhost:8080/api/usuario/createUser", user, { headers });
    }*/

    getUserById(id: number): Observable<Usuario> {
        const headers = this.getHeaders();
        return this.http.get<Usuario>(`http://localhost:8080/api/usuario/${id}`, { headers });
    }
    updateUserById(id: number, user: Usuario, file: File | null): Observable<Usuario> {
        const headers = this.getHeaders();
        const formData: FormData = new FormData();
        
        formData.append('nombre', user.nombre);
        formData.append('apellido1', user.apellido1 || '');
        formData.append('apellido2', user.apellido2 || '');
        formData.append('direccion', user.direccion || '');
        formData.append('ciudad', user.ciudad || '');
        formData.append('cp', user.cp?.toString() || '');
        formData.append('email', user.email);
        formData.append('fecha_nacimiento', user.fecha_nacimiento?.toISOString().split('T')[0] || '');
        formData.append('telefono', user.telefono || '');
        formData.append('biografia', user.biografia || '');
        
        if (user.password) {
            formData.append('password', user.password);
        }
        
        if (file) {
            formData.append('foto_perfil', file);
            console.log("foto_perfil", file);
        }
        
        return this.http.put<Usuario>(`http://localhost:8080/api/usuario/${id}`, formData, { headers });
    }
    
   /* updateUserById(id: number, user: Usuario): Observable<Usuario> {
        const headers = this.getHeaders();
        return this.http.put<Usuario>(`http://localhost:8080/api/usuario/${id}`, user, { headers });
    }*/

    deleteUserById(id: number): Observable<any> {
        const headers = this.getHeaders();
        return this.http.delete(`http://localhost:8080/api/usuario/${id}`,  { headers, responseType: 'text' });
    }
}
