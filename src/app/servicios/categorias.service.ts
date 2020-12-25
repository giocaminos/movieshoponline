import { Injectable } from '@angular/core';
import { Categoria } from '../clases/categoria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  urlBase,
  urlLista,
  urlCategoria,
  urlSave,
  urlPublica,
} from '../clases/urlglobales';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import { urlDelete } from '../clases/urlglobales';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get(urlBase + urlPublica + urlLista + urlCategoria).pipe(
      catchError(e => {
        this.router.navigate(['/categorias']);
        Swal('Error ', e.error.obj, 'error');
        return throwError(e);
      }),
      map((response) => {
        return response as Categoria[];
      })
    );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get(urlBase + urlPublica + urlCategoria + id).pipe(
      map((response) => {
        return response as Categoria;
      })
    );
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(
      urlBase + urlSave + urlCategoria, categoria, { headers: this.agregarAutorizacionHeader() }
    ).pipe(
      catchError(e => {
        if (e.status === 401){
          this.router.navigate(['/login']);
          Swal('Error ', 'Acceso denegado', 'error');
        }else{
          Swal('Error ', 'Error al Guardar', 'error');
        }
        return throwError(e);
      }),
      map((response) => {
        return response;
      })
    );
  }

  delete(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(urlBase + urlDelete + urlCategoria + id,
      { headers: this.agregarAutorizacionHeader() }).pipe(
        catchError(e => {
          this.router.navigate(['/categorias']);
  
          if (e.status == 401){
            Swal('Error ', 'Acceso denegado', 'error');
          }else{
            Swal('Error ', 'Error interno en el servidor', 'error');
          }
  
          return throwError(e);
        })  
      );
    }
  }

